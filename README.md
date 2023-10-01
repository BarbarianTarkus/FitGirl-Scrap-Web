# FitGirl-Scrap-Web



## Preview
![image](https://github.com/BarbarianTarkus/FitGirl-Scrap-Web/assets/44118965/66e89b72-024b-4c47-858b-bcd5222b463f)

## Future addtions
**Dev:**
- [ ] Pagination 📖
- [ ] Search bar 🔎
- [ ] Automate Scrapping Process 🕷️🕸️
- [ ] Connection to a Videogame DB API 🖥️
  **This is for add fuctionality like** 
  - [ ] Custom Filtering ✔️✖️
  - [ ] Like, Dislike 👍
- [ ] Add native comments 💭


**Production:**
- [ ] Add Nginx to docker 📚




## Build




### Docker compose (Redis DB)
```
docker compose up -d
```


### Rustcrap(Web Scrapper)

```bash
cd rustcrap/
cargo build
cargo run
```
* It generates a file `output.csv`, by the moment we have load the information gathered manually to the DB

### Webpage

Frontend developed with SvelteKit
* Gets all the data from DedisDB with the package ioredis


```bash
cd web/
npm i
npm run dev
```




⚡⚡ **DISCLAIMER**⚡⚡

This is for only for educational purposes. :books:
