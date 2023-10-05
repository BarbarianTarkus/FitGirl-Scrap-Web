# FitGirl-Scrap-Web



## Preview
![localhost_4000_games_1](https://github.com/BarbarianTarkus/FitGirl-Scrap-Web/assets/44118965/d227df47-8da8-46ff-bd0b-104353acaa7b)



## Future addtions
**Dev:**
- [x] Pagination(Very bad use of memory for the moment) 📖
- [x] Search bar 🔎
- [ ] Use redis caché for optimize navigation, query's...
- [x] Pagination
- [ ] Automate Scrapping Process 🕷️🕸️
- [ ] Connection to a VideogameDB API 🖥️
  **This is for add fuctionality like** 
  - [ ] Advanced Filtering ✔️✖️
      - [ ] Order, filter, by compression ratio
      - [ ] Online, Coop, Single player features
      - [ ] Genre
      - [ ] Stats(Times Viewed, Downloaded, Game Scores) 
  - [ ] Like, Dislike 👍
- [ ] Add native comments 💭


**Production:**
- [ ] Unofficial Fitgirl Repacks API

## Build

### 1. Docker compose (Redis DB)
```
docker compose up -d
```


### 2. Rustcrap(Web Scrapper)
Needs a redis server running
Crawls every page of the official website and saves to the redis DB

```bash
cd rustcrap/
cargo build
cargo run
```
* By the moment it needs to be launched manually


### Debugging Web App

Frontend developed with SvelteKit
* Gets all the data from DedisDB with the package ioredis


```bash
cd web/
npm i
npm run dev
```




⚡⚡ **DISCLAIMER**⚡⚡

This is for only for educational purposes. :books:
