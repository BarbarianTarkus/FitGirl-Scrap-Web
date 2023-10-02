use redis::{AsyncCommands, Client, RedisResult};
use redis_macros::{FromRedisValue, ToRedisArgs};
use reqwest::blocking::get;
use scraper::{self, Selector};
use serde::{Deserialize, Serialize};
use tokio;

#[derive(Serialize, Deserialize, FromRedisValue, ToRedisArgs)]
struct Item {
    id: Option<String>,
    title: Option<String>,
    image: Option<String>,
    url: Option<String>,
    description: Option<String>,
    magnet: Option<String>,
    size: Option<String>,
    date: Option<String>,
}

impl Item {
    fn new(html_item: scraper::ElementRef) -> Self {
        let id = html_item
            .select(&Selector::parse(" div > h3 > span").unwrap())
            .next()
            .map(|id| id.text().collect::<String>());

        let title = html_item
            .select(&Selector::parse(".entry-title").unwrap())
            .next()
            .map(|title| title.text().collect::<String>());

        let image = html_item
            .select(&Selector::parse("a > img").unwrap())
            .next()
            .and_then(|img| img.value().attr("src"))
            .map(str::to_owned);

        let url = html_item
            .select(&Selector::parse(".entry-title a").unwrap())
            .next()
            .and_then(|a| a.value().attr("href"))
            .map(str::to_owned);

        let description = None;

        let magnet = html_item
            .select(&Selector::parse("a[href^=\"magnet\"]").unwrap())
            .next()
            .and_then(|a| a.value().attr("href"))
            .map(str::to_owned);

        let size = html_item
            .select(&Selector::parse("div > p:nth-child(2) > strong:nth-child(11)").unwrap())
            .next()
            .map(|size| size.text().collect::<String>());

        let date = html_item
            .select(&Selector::parse("span.entry-date > a > time").unwrap())
            .next()
            .and_then(|a| a.value().attr("datetime"))
            .map(str::to_owned);

        Item {
            id,
            title,
            image,
            url,
            description,
            magnet,
            size,
            date,
        }
    }
}

// fn output_items_to_csv(items: Vec<Item>) {
//     let mut writer = WriterBuilder::new()
//         .has_headers(true)
//         .from_writer(File::create("output.csv").unwrap());

//     for item in items {
//         if item.magnet.is_some() {
//             writer.serialize(item).unwrap();
//         }
//     }
// }

#[tokio::main]
async fn write_to_redis(items: Vec<Item>) -> RedisResult<()> {
    let client = Client::open("redis://localhost:6379")?;
    let mut con = client.get_async_connection().await?;

    // user and stored_user will be the same
    //let stored_user: Item = con.get("game","*")?;
    for item in items {
        if item.id.is_some() {
        let _: () = con
            .hset_multiple(
                &item.id.unwrap_or_default(),
                &[
                    ("title", item.title.unwrap_or_default()),
                    ("image", item.image.unwrap_or_default()),
                    ("url", item.url.unwrap_or_default()),
                    ("description", item.description.unwrap_or_default()),
                    ("magnet", item.magnet.unwrap_or_default()),
                    ("size", item.size.unwrap_or_default()),
                    ("date", item.date.unwrap_or_default()),
                ],
            )
            .await?;
        }
    }

    Ok(())
}

#[allow(unused_imports)]
fn main() {
    let response = get("https://fitgirl-repacks.site/").unwrap();
    let data: String = response.text().unwrap();
    let document = scraper::Html::parse_document(&data);

    let html_item_selector = Selector::parse("article.post").unwrap();
    let html_items = document.select(&html_item_selector);

    let items: Vec<Item> = html_items.map(Item::new).collect();

    // output it to csv
    write_to_redis(items);
}
