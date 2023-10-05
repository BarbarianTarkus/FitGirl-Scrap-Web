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

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.games {
		width: 70%;
		height: auto;
		display: grid;

		grid-template-columns: repeat(3, 2fr);
		gap: 0.4rem;
	}

	@media (max-width: 768px) {
		.games {
			grid-template-rows: auto;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 400px) {
		.games {
			grid-template-rows: auto;
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
