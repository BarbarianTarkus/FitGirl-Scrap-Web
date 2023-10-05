<script lang="ts">
	import type { PageData } from './$types';
	import GameComponent from '$lib/components/game.svelte';
	import Searchbar from '$lib/components/searchbar.svelte';
	export let data: PageData;
</script>

{#if data.games.length > 0}
	<main id="gameshelf">
		<form action="/search">
			<Searchbar />
		</form>
		<div class="games">
			{#each data.games as game}
				<GameComponent {game} />
			{/each}
		</div>
	</main>
{:else}
	<p>No games found</p>
{/if}

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
