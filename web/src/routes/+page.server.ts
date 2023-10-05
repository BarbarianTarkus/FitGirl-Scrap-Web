import { getAllGames, redis, gameRepository, mapGames } from '$lib/server/redis';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const data = await getAllGames();
	const dataLength = await gameRepository.search().return.all();
	return {
		games: data,
		size: dataLength.length
	};
};
