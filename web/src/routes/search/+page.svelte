<script lang="ts">
	import type { PageData } from './$types';
	import type { GameType } from '$lib/types';
	import GameComponent from '$lib/components/game.svelte';
	import Searchbar from '$lib/components/searchbar.svelte';
	export let data: PageData;

	console.log(data);
	const games: GameType[] = data.games;
</script>

{#if games.length > 0}
	<main id="gameshelf">
		<script>
			import { navigate } from 'svelte-routing';
			function handleSubmit(event) {
				const searchInput = event.target.querySelector('input[type="search"]');
				const searchQuery = searchInput.value;
				navigate(`/search?q=${searchQuery}`);
			}
		</script>
		<form on:submit|preventDefault={handleSubmit}>
			<Searchbar />
		</form>

		<div class="items">
			{#each games as game}
				<GameComponent {game} />
			{/each}
		</div>
	</main>
{:else}
	<p>No games found</p>
{/if}
