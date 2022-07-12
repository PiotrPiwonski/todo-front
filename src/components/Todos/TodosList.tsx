import React, {useState, useEffect} from "react";
import {TodoEntity} from 'types';
import {Spinner} from "../../common/Spinner/Spinner";
import {TodosTable} from "./TodosTable";
import {AddTodo} from "./AddTodo";
import './Todos.css';

export const TodosList = (userId: any) => { // nie wiem dlaczego userId przychodzi jako obiekt :(
    const [todosList, setTodosList] = useState<TodoEntity[] | null>(null);
    const refreshTodos = async () => {
        setTodosList(null);
        const res = await fetch(`http://localhost:3001/todo/${userId.userId}`);
        const data = await res.json();
        setTodosList(data.todoList);
    };

    useEffect(() => {
        refreshTodos();
    }, []);

    if (todosList === null) {
        return <Spinner/>;
    }


    return (
        <>
            <div>
                <AddTodo onTodoChange={refreshTodos} userId={userId.userId}/>
            </div>
            <div>
                <h3>Todos:</h3>
                <TodosTable todos={todosList} onTodoChange={refreshTodos}/>
            </div>

        </>
    );
};