import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { redis, gameRepository } from '$lib/server/redis';
import type { GameType } from '$lib/types';
import type { EntityData } from 'redis-om';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q')?.toLocaleLowerCase();

	if (!q) {
		throw error(400, 'No query provided');
	}
	const getGames = async (q: string) => {
		//Usar la query
		const res: EntityData = await gameRepository
			.search()
			.where('title')
			.match(q)
			.sortBy('date', 'DESC')
			.return.all();

		const games = res.map((game) => {
			const mappedGame: GameType = {
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
		console.log(q, games.length);
		return games;
	};

	return {
		games: getGames(q)
	};
};
