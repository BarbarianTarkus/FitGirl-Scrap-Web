<script lang="ts">
    import { emoji } from './emoji'

    let size = 20
    let grid = createGrid()

    function createGrid() {
        // only want unique cards
        let cards = new Set<string>()
        // half because we duplicate the cards
        let maxSize = size / 2

        while (cards.size < maxSize) {
            // pick random emoji
            const randomIndex = Math.floor(Math.random() * emoji.length)
            cards.add(emoji[randomIndex])
        }

        return [...cards]
    }
</script>


<div class="cards">
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
</style>

