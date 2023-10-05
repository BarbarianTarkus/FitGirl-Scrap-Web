<script lang="ts">
	import type { PageData } from './$types';
	import GameComponent from '$lib/components/game.svelte';
	import SearchBar from '$lib/components/searchbar.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	//Pagination
	let pageSize = 6;
	$: totalItems = data.size;
	$: totalPages = Math.ceil(totalItems / pageSize);
	$: currentPage = Number($page.params.page) - 1;
</script>

<main id="gameshelf">
	<form action="/search">
		<SearchBar />
	</form>

	<div class="games">
		{#each data.gamesPaged as game}
			<GameComponent {game} />
		{/each}
	</div>

	<div class="pagination">
		{#each Array(totalPages) as _, idx}
			<a href="/games/{idx + 1}" class={currentPage === idx ? 'text-emeral-300' : ''}>
				{idx + 1}
			</a>
		{/each}
	</div>
</main>
