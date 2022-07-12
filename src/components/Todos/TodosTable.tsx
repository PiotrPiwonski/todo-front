import React from "react";
import { TodoEntity } from "types";
import {TodoTableRow} from "./TodoTableRow";

interface Props {
    todos: TodoEntity[];
    onTodoChange: () => void;
}

export const TodosTable = (props: Props) => (
    <table>
        <thead>
        {
            props.todos.length === 0
                ?
                null
                :
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
        }

        </thead>
        <tbody>
        {props.todos.map(todo => (
            <TodoTableRow
                todo={todo}
                key={todo.id}
                onTodoChange={props.onTodoChange}
            />
        ))}
        </tbody>
    </table>
);