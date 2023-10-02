import { getGames } from '$lib/server/redis';

export async function load() {
	const data = await getGames();
	return {
		games: data
	};
}
