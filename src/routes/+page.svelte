<!--
    Everything seems to be build using block.

    Svelte accounts a variable change only when an assignment is used, as it does static code analysis.

    Starting a block - #
    Continuing a block - :
    Closing a block - /
-->

<script>
	let count = 0;
	let arr = [0, 1, 2, 3];

	/**
	 * @param {number} ms
	 */
	function sleep(ms) {
		return new Promise((r) => setTimeout(r, ms));
	}

	async function get_data() {
		await sleep(4000); // simulate data fetching
		if (Math.random() > 0.5) throw new Error();
        return 42;
	}
</script>

<button
	on:click={() => {
		// we can use JavaScript
		count++; // it knows it has to re-render the component
	}}
>
	{count}
</button>

<!-- declare a block to be visualized only when a condition is satisfied -->
{#if count === 0}
	zero
{:else if count % 2 === 0}
	even
{:else}
	odd
{/if}

<!-- declare block to iterate the elements of an iterable structure -->
{#each arr as item}
	<!-- renaming item to count would shadow the "global" variable count -->
	<div>
		{item}
	</div>
{/each}

{#await get_data()}
	Loading... <!-- would be visualized until the function returns (the promise resolves) -->
{:then result}
	{result}
{:catch e}
	{e}
{/await}
