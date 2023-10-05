<script lang="ts">
	import type { GameType } from '$lib/types';
	export let game: GameType;
</script>

<button class="game">
	<a href={game.url}>
		<img src={game.image} alt={game.title} />
	</a>
</button>

<style lang="postcss">
	
	.game {
		height: 27em;
		width: 20em;
		background-color: #1a202c;
		border: solid transparent;
		border-radius: 0.25rem;
	}

	.game img {
		height: 100%;
		width: 100%;
		border-radius: 0.5rem;
		filter: contrast(0.9) blur(0.1px) brightness(1.1) saturate(1.1);
	}

	.game:hover img {
		filter: brightness(0.5);
	}
</style>
