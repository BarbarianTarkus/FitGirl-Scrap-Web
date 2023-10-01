<script lang="ts">
	import type { Game } from '$lib/types';
	import { onMount } from 'svelte';

	export let data: {games: Game[]};


	console.log('page info:', data.games.length);

	let size = data.games.length;
	//let grid = createGrid();

    function createGrid() {
    	// only want unique cards
    	let cards = new Set<string>();
    	// half because we duplicate the cards

    	let maxSize = 20;
        let i = 0;
    	while (i < maxSize) {
    		// pick random emoji
    		cards.add(data.games[i].title);
    	}

    	return [...cards];
    }
</script>


<!-- <div class="cards">
    {#each grid as card, cardIndex}
        <button class="card">
            <div>{card}</div>
        </button>
    {/each}
</div>


<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.4rem;
	}

	.card {
		height: 400px;
		width: 300px;
		font-size: 4rem;
		background-color: var(--bg-2);
		&.selected {
			border: 4px solid var(--border);
		}
	}
</style> -->
