# FitGirl-Scrap-Web



## Preview
![image](https://github.com/BarbarianTarkus/FitGirl-Scrap-Web/assets/44118965/c71d0317-5836-41d9-813c-994eff9db9ad)


## Future addtions
**Dev:**
- [x] Pagination(Very bad use of memory for the moment) 📖
  - [ ] Use redis caché for optimze the searchs
- [x] Search bar 🔎
  - [ ] Use os querys for fetch the data from redis
- [ ] Automate Scrapping Process 🕷️🕸️
- [ ] Connection to a Videogame DB API 🖥️
  **This is for add fuctionality like** 
  - [ ] Custom Filtering ✔️✖️
  - [ ] Like, Dislike 👍
- [ ] Add native comments 💭


**Production:**

~~- [x] Add Nginx to docker 📚~~(Useless)




## Build

### 1. Docker compose (Redis DB)
```
docker compose up -d
```


### 2. Rustcrap(Web Scrapper)

```bash
cd rustcrap/
cargo build
cargo run
```
* Put every game found in the official page in a redis Hash

### 3. Webpage

Frontend developed with SvelteKit
* Gets all the data from DedisDB with the package ioredis


```bash
cd web/
npm i
npm run dev
```




⚡⚡ **DISCLAIMER**⚡⚡

This is for only for educational purposes. :books:
