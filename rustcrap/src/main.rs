use csv::WriterBuilder;
use reqwest::blocking::get;
use scraper::{self, Selector};
use std::fs::File;


#[derive(Debug, serde::Serialize)]
struct Item {
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

fn output_items_to_csv(items: Vec<Item>) {
    let mut writer = WriterBuilder::new()
        .has_headers(true)
        .from_writer(File::create("output.csv").unwrap());

    for item in items {
        if item.magnet.is_some() {
            writer.serialize(item).unwrap();
        }
    }
}

fn main() {
    let response = get("https://fitgirl-repacks.site/").unwrap();
    let data: String = response.text().unwrap();
    let document = scraper::Html::parse_document(&data);

    let html_item_selector = Selector::parse("article.post").unwrap();
    let html_items = document.select(&html_item_selector);

    let items: Vec<Item> = html_items.map(Item::new).collect();

    // output it to csv
    output_items_to_csv(items);
}
