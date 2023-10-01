<script lang="ts">
    import type {Game} from '$lib/types';
	import { onMount } from 'svelte';
    import {greet} from '$lib/redis';
    
    onMount(async () => {
       greet()
    });

    let size = 20;
    //let grid = createGrid()

    // function createGrid() {
    //     // only want unique cards
    //     let cards = new Set<string>()
    //     // half because we duplicate the cards
    //     console.log("page info:",games)

    //     let maxSize = games.length

    //     while (cards.size < maxSize) {
    //         // pick random emoji
    //         cards.add(games["title"])
    //     }

    //     return [...cards]
    // }
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

