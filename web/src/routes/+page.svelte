<script lang="ts">
	import type { GameType } from '$lib/types';
	import Searchbar from '$lib/components/searchbar.svelte';
	import GameComponent from '$lib/components/game.svelte';
	import NoResults from '$lib/components/noresults.svelte';
	import { paginate, LightPaginationNav, DarkPaginationNav } from 'svelte-paginate'
	import Game from '$lib/components/game.svelte';
	//Retrieve all data
	export let data: { games: GameType[] };
	let games = data.games;

	let items = games;
	let currentPage = 1
	let pageSize = 10
	$: paginatedItems = paginate({ items, pageSize, currentPage })

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
			{#each filteredGames as item}
				<GameComponent {item} />
			{/each}
		</div>
	{:else}
		<div class="items">
			{#each paginatedItems as item}
				<GameComponent {item} />

			{/each}
		</div>
	{/if}
</main>

<DarkPaginationNav
  totalItems="{items.length}"
  pageSize="{pageSize}"
  currentPage="{currentPage}"
  limit="{1}"
  showStepOptions="{true}"
  on:setPage="{(e) => currentPage = e.detail.page}"
/>


<style>
	.items {
		display: grid;
		grid-template-columns: repeat(5, 2fr);
		gap: 0.4rem;
	}

	@media (max-width: 768px) {
		.items {
			grid-template-rows: auto;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 400px) {
		.items {
			grid-template-rows: auto;
			grid-template-columns: repeat(1, 1fr);
		}
	}

</style>
