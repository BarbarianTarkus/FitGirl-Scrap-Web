import { env } from '$env/dynamic/private';
import { createClient } from 'redis';
import type { Game } from '$lib/types';
import { Schema, Repository } from 'redis-om';

const host = env.REDIS_HOST;

const redis = await createClient({
	url: 'redis://'.concat(host)
});

redis.on('error', (err) => console.log('Redis Client Error', err));
await redis.connect();

const gameSchema = new Schema(
	'game',
	{
		id: { type: 'string' },
		title: { type: 'string' },
		image: { type: 'string' },
		url: { type: 'string' },
		description: { type: 'string' },
		magnet: { type: 'string' },
		size: { type: 'string' },
		date: { type: 'string', sortable: true }
	},
	{
		dataStructure: 'HASH'
	}
);

const gameRepository = new Repository(gameSchema, redis);
await gameRepository.createIndex();

export async function getGames() {
	const games = await gameRepository.search().sortBy('date', 'DESC').return.all();

	return games.map((game) => {
		const mappedGame: Game = {
			id: game.id?.toString() ?? '',
			title: game.title?.toString() ?? '',
			image: game.image?.toString() ?? '',
			url: game.url?.toString() ?? '',
			description: game.description?.toString() ?? '',
			magnet: game.magnet?.toString() ?? '',
			size: game.size?.toString() ?? '',
			date: game.date?.toString() ?? ''
		};
		return mappedGame;
	});
}
