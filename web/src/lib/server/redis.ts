import { env } from '$env/dynamic/private';
import {createClient}  from 'redis';
import type { Game } from '$lib/types';
import { Schema, Repository, EntityId  } from 'redis-om';

const host = env.REDIS_HOST;


const redis = await createClient({
		host: host,
		port: 6379
})
redis.on('error', err => console.log('Redis Client Error', err))
await redis.connect();


const gameSchema = new Schema('game', {
	id: { type: 'string'},
	title: {type:'string'},
	image: {type:'string'},
	url: {type:'string'},
	description: {type:'string'},
	magnet: {type:'string'},
	size: {type:'string'},
	date: {type:'string'}
	}, {
		dataStructure: 'HASH',
})

const gameRepository = new Repository(gameSchema, redis)
await gameRepository.createIndex();


export async function getGames() {
	const games = await gameRepository.search().return.all()
	return games.map(game => {
		const mappedGame : Game = {
			id: game.id,
			title: game.title,
			image: game.image,
			url: game.url,
			description: game.description,
			magnet: game.magnet,
			size: game.size,
			date: game.date
		};
		return mappedGame;
	});
}

