import { env } from '$env/dynamic/private';
import { createClient } from 'redis';
import type { Game } from '$lib/types';
import { Schema, Repository } from 'redis-om';
import type { EntityData, Entity } from 'redis-om';

const host = env.REDIS_HOST;

export const redis = await createClient({
	url: 'redis://'.concat(host)
});

redis.on('error', (err) => console.log('Redis Client Error', err));
await redis.connect();

const gameSchema = new Schema(
	'game',
	{
		id: { type: 'string' },
		title: { type: 'text', sortable: true },
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

export const gameRepository = new Repository(gameSchema, redis);
await gameRepository.createIndex();

export async function getAllGames() {
	let games = [];

	const offset = 0;
	const count = 10;

	games = await gameRepository.search().sortBy('date', 'DESC').return.page(offset, count);

	return mapGames(games);
}

export function mapGames(games: EntityData[]): Game[] {
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
