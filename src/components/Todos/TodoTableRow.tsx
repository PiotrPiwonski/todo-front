import React, {MouseEvent} from "react";
import { TodoEntity } from "types";
import './Todos.css';

interface Props {
    todo: TodoEntity;
    onTodoChange: () => void;
}

export const TodoTableRow = (props: Props) => {

    const doneTodo = async (event: MouseEvent) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:3001/todo/${props.todo.id}`, {
            method: 'PATCH',
        });

        if (res.status === 400 || res.status === 500) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }

        props.onTodoChange();

    }

    const deleteTodo = async (event: MouseEvent) => {
        event.preventDefault();

        if(!window.confirm(`Are you sure you want to remowe ${props.todo.description}?`)) {
            return;
        }

        const res = await fetch(`http://localhost:3001/todo/${props.todo.id}`, {
            method: 'DELETE',
        });

        if (res.status === 400 || res.status === 500) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }

        props.onTodoChange();
    };

    return (


            <tr className="list">
                {
                    props.todo.done
                    ?
                        <td style={{
                            "color" : "#186b18",
                            "textDecoration" : "line-through"
                        }}>{props.todo.description}</td>
                    :
                        <td>{props.todo.description}</td>
                }
                <td>
                    <a href="#" onClick={doneTodo}><img src="./done.svg" alt="done"/></a>
                    <a href="#" onClick={deleteTodo}><img src="./trash.svg" alt="trash"/></a>
                </td>



            </tr>


    );
};