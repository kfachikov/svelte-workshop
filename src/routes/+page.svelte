<!--
    There is specific semantic to the components starting with '+'.

    Non-used CSS selectors would not appear in the resulting bundle.
-->

<script>
	import { enhance } from '$app/forms';
    import Todo from './todo.svelte'

    // should be named `data` so Svelte can populate it with the data returned by the `load` function in the corresponding script file
    export let data;

    $: todos = data.todos;

    // would sync (imagine that it adds a listener)
    $: completed_items = todos.filter(obj => obj.completed).length;

    /** 
     * @param {HTMLElement} element
     */
    function test(element) {
        alert('What are you doing?')
    }

	let new_todo = '';
</script>

<!-- submitting a form would reload the page; enhance ensures the entire page is not loaded, but only the necessary data -->
<form use:test use:enhance action="?/add" method="post">
<!-- binding values to different directives -->
<input name="new_todo" bind:value={new_todo} />
<button>
	Add TODO!
</button>
</form>

Completed Items: {completed_items}

<!-- trying to make each element a div would cause svelte to raise a warning, as the user would not be expecting clickable div -->
{#each todos as obj (obj.id)}
    <Todo on:click={() => {
        obj.completed = !obj.completed;
        todos = todos;
    }} {...obj} />
{/each}

<marquee>This is a veeeeeeeeeeeeeeery cool message!</marquee>