import { getGames } from '$lib/server/redis';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {

	const data = await getGames("");
	return {
		games: data
	};
}
