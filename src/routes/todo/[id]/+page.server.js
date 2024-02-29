import { fail, redirect } from '@sveltejs/kit';
import { todos } from '../../db';

export async function load({params: {id}}) {
    
    const todo = todos.find(todo => todo.id === id);

    if(!todo) {
        return fail(400, { message: 'The TODO is not existent!' })
    }

    return { todo };
}

export const actions = {
    async edit({request, params: {id}}) {
        const data = await request.formData();
        const content = data.get('content');
        const completed = data.get('completed');

        if(!content || !completed) {
            return fail(400, { message: 'Cannot edit property!'});
        }

        const todo = todos.find(todo => todo.id === id);

        if(!todo) {
            return fail(400, { message: 'Cannot find the corresponding TODO...'});
        }

        todo.content = content.toString();
        todo.completed = !todo.completed;

        redirect(301, '/');
    }
}