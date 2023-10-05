<script lang="ts">
	import type { PageData } from './$types';
	import GameComponent from '$lib/components/game.svelte';
	import SearchBar from '$lib/components/searchbar.svelte';
	import { page } from '$app/stores';
	import { Pagination } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	export let data: PageData;

	//Pagination
	let pageSize = 6;
	$: totalItems = data.size;
	$: totalPages = Math.ceil(totalItems / pageSize) - 1;
	$: currentPage = Number($page.params.page);

	//Flowbite

	function pagesArray() {
		let pages = [];
		if (currentPage < 3) {
			for (let i = 1; i <= 5; i++) {
				pages.push({ name: i.toString(), href: '/games/' + i, active: i == currentPage });
			}
			pages.push({ name: '...', active: false });
			pages.push({ name: totalPages.toString(), href: '/games/' + totalPages, active: false });
		} else if (currentPage == totalPages) {
			pages.unshift({ name: '1', active: false });
			pages.unshift({ name: '...', active: false });
			for (let i = totalPages - 4; i <= totalPages; i++) {
				pages.push({ name: i.toString(), href: '/games/' + i, active: i == currentPage });
			}
		} else {
			if (currentPage > 4) {
				pages.unshift({ name: '1', href: '/games/1', active: false });
				pages.unshift({ name: '...', active: false });
			}
			for (let i = currentPage - 2; i <= currentPage + 2; i++) {
				pages.push({ name: i.toString(), href: '/games/' + i, active: i == currentPage });
			}
			pages.push({ name: '...', active: false });
			pages.push({ name: totalPages.toString(), href: '/games/' + totalPages, active: false });
		}
		return pages;
	}

	$: pages = pagesArray(currentPage);

	const previous = () => {
		$: currentPage = currentPage - 1;
		window.location.href = '/games/' + currentPage;
	};
	const next = () => {
		$: currentPage = currentPage + 1;
		window.location.href = '/games/' + currentPage;
	};
</script>



<main id="gameshelf">

	<section>
		<DarkMode />
		<Breadcrumb class="flex margin " aria-label="Default breadcrumb example">
			<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/games">Games</BreadcrumbItem>
		</Breadcrumb>
		<form class="search" action="/search">
			<SearchBar />
		</form>
	</section>
	<div class="games">
		{#each data.gamesPaged as game}
			<GameComponent {game} />
		{/each}
	</div>

	<Pagination {pages} on:previous={previous} on:next={next} />
</main>

<style>
	section {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.search {
		margin-top: 5px;
		margin-bottom: 0px;
	}


	@media (max-width: 400px) {
		section {
			flex-direction: column;
		}
	}
</style>
