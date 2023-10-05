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
		<div class="items">
			{#each data.games as game}
				<GameComponent {game} />
			{/each}
		</div>
	</main>
{:else}
	<p>No games found</p>
{/if}
