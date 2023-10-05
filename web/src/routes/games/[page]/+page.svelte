<script lang="ts">
	import type { PageData } from './$types';
	import GameComponent from '$lib/components/game.svelte';
	import SearchBar from '$lib/components/searchbar.svelte';
	import { page } from '$app/stores';
	import { Pagination } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';

	export let data: PageData;

	//Pagination
	let pageSize = 6;
	$: totalItems = data.size;
	$: totalPages = Math.ceil(totalItems / pageSize);
	$: currentPage = Number($page.params.page);

	//Flowbite 


	function pagesArray() {
		let pages = [];
		if (currentPage < 3) {
			for (let i = 1; i <= 5; i++) {
				pages.push({name: i.toString(), href:'/games/'+(i), active: i == currentPage});
			}
		} else if (currentPage == totalPages) {
			for (let i = totalPages - 4; i <= totalPages; i++) {
				pages.push({name: i.toString(), href:'/games/'+(i), active: i == currentPage});
			}
		} else {
			for (let i = currentPage - 2; i <= currentPage + 2; i++) {
				pages.push({name: i.toString(), href:'/games/'+(i), active: i == currentPage});
			}
		}
		return pages;
	}

	$: pages = pagesArray(currentPage);

	
	const previous = () => {
		$: currentPage = currentPage - 1;
		window.location.href = '/games/'+(currentPage);
	};
	const next = () => {
		$: currentPage = currentPage + 1;
		window.location.href = '/games/'+(currentPage);
	};
</script>

<section>
	<div></div>
	<form class=search action="/search">
		<SearchBar />
	</form>
	<DarkMode  />	
</section>


<main id="gameshelf">
	<div class="games">
		{#each data.gamesPaged as game}
			<GameComponent {game} />
		{/each}
	</div>
	
	<Pagination { pages } on:previous={previous} on:next={next} />
</main>

<style>
	section {
		width: 80%;
		display: flex;
		justify-content: space-around;
		
		align-items: center;
	}
	.search{
		margin-top: 5px;
		margin-bottom: 0px;	
	}

</style>