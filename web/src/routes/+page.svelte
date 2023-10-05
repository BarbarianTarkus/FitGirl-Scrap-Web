<script lang="ts">
	import type { GameType } from '$lib/types';
	import Searchbar from '$lib/components/searchbar.svelte';
	import GameComponent from '$lib/components/game.svelte';
	//Retrieve all data
	export let data;
	let games: GameType[] = data.games;
	let pageSize = 6;
	$: totalItems = data.size;
	$: totalPages = Math.ceil(totalItems / pageSize);
</script>

<main id="gameshelf">
	<form action="/search">
		<Searchbar />
	</form>

	<div class="games">
		{#each games as game}
			<GameComponent {game} />
		{/each}
	</div>

	<div class="pagination">
		{#each Array(totalPages) as _, idx}
			<a href="/games/{idx + 1}">
				{idx + 1}
			</a>
		{/each}
	</div>
</main>