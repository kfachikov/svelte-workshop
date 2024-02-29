<!--
    There is specific semantic to the components starting with '+'.
-->

<script>
	let arr = [
		{ id: 1, content: 'Random content!', completed: true },
		{ id: 2, content: 'Hmm, why is this content not ready...', completed: false }
	];

    let completed_items = arr.filter(obj => obj.completed).length;

    // would sync (imagine that it adds a listener)
    $: {
        completed_items = arr.filter(obj => obj.completed).length;
    }

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
    <!-- alternatively to the class, we can use style : style="text-decoration: {obj.completed ? 'line-through' : ''};" -->
	<button 
    class:completed={obj.completed}
		on:click={() => {
			obj.completed = !obj.completed;
			arr = arr;
		}}
	>
		{obj.content} - {obj.completed}
	</button>
{/each}

<style>
    .completed {
        text-decoration: line-through;
    }
    button {
        all: unset;
        display: block;
    }
</style>