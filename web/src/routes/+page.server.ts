import { getAllGames, gameRepository } from '$lib/server/redis';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await getAllGames();
	const dataLength = await gameRepository.search().return.all();
	return {
		games: data,
		size: dataLength.length
	};
};
