<script lang="ts">
	export let searchTerm: string = '';
</script>

<div id="search-input-cont">
	<input
		type="text"
		id="search-field"
		placeholder="Enter Search Term"
		autocomplete="on"
		bind:value={searchTerm}
		on:input
	/>
</div>

<style>
	#search-input-cont {
		width: 30%;
		display: flex;
		align-items: center;
		color-scheme: dark;
		font-color: white;
		padding: 10px 0px;
	}

	#search-field {
		width: 100%;
		font-size: 1.3rem;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 8px;
		margin: 0 10px 0;
		font-color: white;
		font-weight: 900;
	}

	@media (max-width: 768px) {
		#search-input-cont {
			width: 50%;
		}
	}
	@media (max-width: 400px) {
		#search-input-cont {
			width: 50%;
		}
	}
</style>
