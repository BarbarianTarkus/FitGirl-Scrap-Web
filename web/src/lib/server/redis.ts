import { env } from '$env/dynamic/private';
import Redis from 'ioredis';


const redis = new Redis();

export async function getGames() {
	const keys = await redis.keys('#*');
	console.log(keys);
	const pipeline = redis.pipeline();
	keys.forEach((key) => {
		pipeline.hgetall(key);
	});
	const results = await pipeline.exec();
	const hashes = results.map((result) => result[1]);
	return hashes;
}
