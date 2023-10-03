<script lang="ts">
	import type { GameType } from '$lib/types';
	import Searchbar from '$lib/components/searchbar.svelte';
	import GameComponent from '$lib/components/game.svelte';
	import NoResults from '$lib/components/noresults.svelte';
	//Retrieve all data
	export let data: { games: GameType[] };
	let games = data.games;

	let size = games.length;
	let grid = createGrid();
	function createGrid() {
		let cards = new Set<GameType>();
		let i = 0;
		while (cards.size < size) {
			cards.add(games[i]);
			++i;
		}
		return [...cards];
	}

	//Query Results
	let filteredGames: GameType[] = [];

	//For Select Menu
	$: console.log(filteredGames);

	// For Search Input
	let searchTerm = '';

	const searchGames = () => {
		return (filteredGames = games.filter((game) => {
			let gameTitle = game.title.toLowerCase();
			return gameTitle.includes(searchTerm.toLowerCase());
		}));
	};
</script>

<section>
	<Searchbar bind:searchTerm on:input={searchGames} />
</section>

<main id="gameshelf">
	{#if searchTerm && filteredGames.length == 0}
		<NoResults />
	{:else if filteredGames.length > 0}
		<div class="cards">
			{#each filteredGames as game}
				<GameComponent {game} />
			{/each}
		</div>
	{:else}
		<div class="cards">
			{#each games as game}
				<GameComponent {game} />
			{/each}
		</div>
	{/if}
</main>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.4rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.4rem;
	}

	@media (max-width: 768px) {
		.cards {
			grid-template-rows: auto;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 400px) {
		.cards {
			grid-template-rows: auto;
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
