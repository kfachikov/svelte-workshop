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
    },

    async toggle({request}) {
        const data = await request.formData();
        const todo_id = data.get('todo_id');
        
        if(!todo_id) {
            return fail(400);
        }

        const todo = todos.find(todo => todo.id === todo_id.toString());
        
        if(!todo) {
            return fail(500, { message: 'Cannot find the necessary todo...' })
        }

        todo.completed = !todo.completed;
    }
}