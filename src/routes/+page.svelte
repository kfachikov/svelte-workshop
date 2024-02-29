<!--
    There is specific semantic to the components starting with '+'.

    Non-used CSS selectors would not appear in the resulting bundle.
-->

<script>
    import Todo from './todo.svelte'
	let arr = [
		{ id: '1', content: 'Random content!', completed: true },
		{ id: '2', content: 'Hmm, why is this content not ready...', completed: false }
	];

    // would sync (imagine that it adds a listener)
    $: completed_items = arr.filter(obj => obj.completed).length;

	let new_content = '';
</script>

<!-- binding values to different directives -->
<input bind:value={new_content} />

<button
	on:click={() => {
		arr.push({
			id: crypto.randomUUID(),
			completed: false,
			content: new_content
		});
        arr = arr;
        new_content = '';
	}}
>
	Add TODO!
</button>

Completed Items: {completed_items}

<!-- trying to make each element a div would cause svelte to raise a warning, as the user would not be expecting clickable div -->
{#each arr as obj (obj.id)}
    <Todo on:click={() => {
        obj.completed = !obj.completed;
        arr = arr;
    }} {...obj} />
{/each}