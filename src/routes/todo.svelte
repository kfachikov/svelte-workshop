<script>
	/**
	 * @type {boolean}
	 */
	export let completed;

	/**
	 * @type {string}
	 */
	export let content;

	/**
	 * @type {string}
	 * fallback values can be initialized
	 */
	export let id;
</script>

<!-- not specifying the on:click action, it would get dispatched to the parent -->
<button class:completed on:click>
	{content} - {completed}
</button>

<!-- style tags are available only to the component they are defined in -->
<style>
    .completed {
        text-decoration: line-through;
    }
    button {
        all: unset;
        display: block;
    }
</style>