<script>
	import { enhance } from '$app/forms';

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

<form action="?/toggle" method="post" use:enhance>
	<input value={id} name="todo_id" type="hidden">
	<!-- not specifying the on:click action, it would get dispatched to the parent -->
	<button class:completed on:click>
		{content} - {completed}
	</button>
</form>

<a href="/todo/{id}">Edit</a>

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
