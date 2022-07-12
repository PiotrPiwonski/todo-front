import React, {FormEvent, useState} from "react";
import {CreateTodoReq } from 'types';
import {Spinner} from "../../common/Spinner/Spinner";
import './Todos.css';

interface Props {
    onTodoChange: () => void;
    userId: string;
}

export const AddTodo = (props: Props) => {
    const [form, setForm] = useState<CreateTodoReq>({
        description: '',
        done: 0,
        userId: props.userId,
    });
    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
             await fetch(`http://localhost:3001/todo/${props.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            props.onTodoChange();
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>;
    }



    return (
        <form className="todo-form" onSubmit={sendForm}>
            <h2>Add todo: </h2>
            <input
                type="text"
                value={form.description}
                onChange={e => updateForm('description', e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}