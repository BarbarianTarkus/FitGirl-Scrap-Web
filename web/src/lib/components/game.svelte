<script lang="ts">
	import type { GameType } from '$lib/types';
	export let game: GameType;
</script>

<button class="card">
	<a href={game.url}>
		<img src={game.image} alt={game.title} />
	</a>
</button>

<style>
	.card {
		background-color: var(--bg-2);
		border: 4px solid transparent;
		transition: border-color 0.2s ease-in-out;
		margin: 0.2rem;
		padding: 1rem;
	}

	.card img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.card:hover img {
		filter: brightness(0.5);
	}
</style>
