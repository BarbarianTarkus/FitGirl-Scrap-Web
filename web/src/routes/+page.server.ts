import { getGames } from "$lib/server/redis";
import type { Game } from "$lib/types";



export async function load() {
    const data = await getGames()

    return {
        games: data
    }
}