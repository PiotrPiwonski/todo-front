import React, {useEffect, useState} from "react";
import {NavigationUser} from "../components/Navigation/NavigationUser";
import { useNavigate } from 'react-router-dom';
import {TodosList} from "../components/Todos/TodosList";
import {Spinner} from "../common/Spinner/Spinner";

export const TodoView = () => {
    const [userData, setUserData] = useState({
        id: '',
        name: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const uploadUser = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/login`);
            const data = await res.json();
            // console.log(data);
            setUserData(data);
            // console.log(userData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        uploadUser();

    }, []);

    if (loading) {
        return (
            <Spinner/>
        )
    }

    if (!userData.id || !userData.name) {
        navigate('/');
    }

    return (
        <>
            <NavigationUser id={userData.id}/>
            <div className="todos-container">
                <h2>Hello {userData.name}</h2>
                <TodosList userId={userData.id}/>
            </div>

        </>
    )
}