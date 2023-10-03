<script lang="ts">
	import type { GameType } from '$lib/types';
	export let game: GameType;
</script>

<button class="card">
	<a href={game.url} target="_blank">
		<img src={game.image} alt={game.title} />
	</a>
</button>

<style>
	.card {
		background-color: var(--bg-2);
		border: 4px solid transparent;
		transition: border-color 0.2s ease-in-out;
	}

	.card img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.card:hover img {
		filter: brightness(0.5);
	}

	@media (max-width: 768px) {
		.cards {
			grid-template-rows: auto;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 400px) {
		.cards {
			grid-template-rows: auto;
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
