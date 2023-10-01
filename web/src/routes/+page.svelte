<script lang="ts">
	import type { Game } from '$lib/types';
	import { onMount } from 'svelte';

	export let data: {games: Game[]};


	console.log('page info:', data.games[0]);

	let size = data.games.length;
	let grid = createGrid();

    function createGrid() {
    	// only want unique cards
    	let cards = new Set<Game>();
    	// half because we duplicate the cards
        let i = 0;
    	while (cards.size < size) {
    		// pick random emoji
    		cards.add(data.games[i]);
            ++i;
    	}

    	return [...cards];
    }



</script>

<div class="cards">
    {#each grid as card}
        <button class="card">
            <a href={card.url} target="_blank">
                <img src={card.image} alt={card.title} />
            </a>
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
		background-color: var(--bg-2);
		&.selected {
			border: 4px solid var(--border);
		}
	}

    .card img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
</style>
