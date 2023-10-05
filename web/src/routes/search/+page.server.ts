import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { gameRepository, mapGames } from '$lib/server/redis';
import type { Entity } from 'redis-om';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q').toString().toLowerCase();

	if (!q) {
		throw error(400, 'No query provided');
	}
	const getGames = async (q: string) => {
		//Usar la query
		const res: Entity[] = await gameRepository
			.search()
			.where('title')
			.match('*' + q + '*')
			.sortBy('date', 'DESC')
			.return.page(0, 6);
		const games = mapGames(res);
		return games;
	};

	return {
		games: getGames(q)
	};
};
