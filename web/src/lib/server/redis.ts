import Redis from "ioredis";
const redis = new Redis();

export async function getGames() {
    const keys = await redis.keys("game:*");
    const pipeline = redis.pipeline();
    keys.forEach((key) => {
        pipeline.hgetall(key);
    });
    const results = await pipeline.exec();
    const hashes = results.map((result) => result[1]);
    return hashes;
}