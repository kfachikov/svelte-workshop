<script>
	import { enhance } from '$app/forms';

    export let data;

    export let form;

    $: todo = data.todo;

    $: content = todo?.content;
    $: completed = todo?.completed;
</script>

{#if form?.message}
    <strong>{form.message}</strong>
{/if}
<form use:enhance={( { cancel, formData }) => {
    const new_content = formData.get('content');

    if(!new_content) {
        form = {
            message: 'No new content!',
        }

        cancel();
    }
}} action="?/edit" method="post">
    <input name="content" value={content}>
    <input name="completed" type="hidden" value={completed}>
    <button>
        {#if completed}
            Open
            {:else}
            Close
        {/if}
    </button>
</form>

TODO: {content}
Completed: {completed}