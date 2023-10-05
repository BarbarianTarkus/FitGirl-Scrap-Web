import { mapGames, setupDB } from '$lib/server/redis';
import type { GameType } from '$lib/types';
import {building} from '$app/environment';


export async function load({ params }) {
	let gameRepository;
	if (!building){
		gameRepository = await setupDB();
	}

	const page = Number(params.page);
	const dataLength = await gameRepository.search().return.all();
	async function getGames(page: number) {
		const offset = 0 + page * 6;
		console.log('offset:', offset);
		const limit = 6;
		const res = await gameRepository.search().sortBy('date', 'DESC').return.page(offset, limit);
		const games: GameType[] = mapGames(res);
		return games;
	}

	console.log('page:', getGames(page));

	return {
		gamesPaged: getGames(page),
		size: dataLength.length
	};
}
