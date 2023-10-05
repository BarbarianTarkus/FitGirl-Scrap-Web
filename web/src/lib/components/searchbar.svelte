<script lang="ts">
</script>

<div id="search-input-cont">
	<input type="search" id="q" name="q" placeholder="Search..." autocomplete="on" />
</div>

<style>
	#search-input-cont {
		width: 30%;
		display: flex;
		align-items: center;
		color-scheme: dark;
		font-style: white;
		padding: 10px 0px;
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
