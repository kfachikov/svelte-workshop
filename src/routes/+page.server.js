// by naming a page `...server.js`, Svelte would automatically run the script on the server

import { fail } from '@sveltejs/kit';
import { todos } from './db';

// should be named `load` to allow Svelte to connect the `data` property in the corresponding component
export async function load() {
    return { todos };
}

// endpoint that would accept form requests
export const actions = {
    // called whenever the user submit a form to a specified URL
    async add({request}) {
        const data = await request.formData();
        const new_todo = data.get('new_todo');
        
        if(!new_todo) {
            return fail(400);
        }

        todos.push(
            {
                id: crypto.randomUUID(),
                // @ts-ignore
                content: new_todo,
                completed: false,
            }
        )
    }
}