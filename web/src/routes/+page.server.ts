import { mapGames, setupDB } from '$lib/server/redis';
import type { PageServerLoad } from './$types';
import{ building } from '$app/environment';

export const load: PageServerLoad = async () => {
	let gameRepository;
	if (!building){
		gameRepository = await setupDB();
	}

	async function getAllGames() {
		let games = [];
	
		const offset = 0;
		const count = 10;
	
		games = await gameRepository.search().sortBy('date', 'DESC').return.page(offset, count);
	
		return mapGames(games);
	}

	const data = await getAllGames();
	const dataLength = await gameRepository.search().return.all();
	return {
		games: data,
		size: dataLength.length
	};
};
