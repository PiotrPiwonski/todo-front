import React, {FormEvent, useState} from "react";
import {Navigation} from "../components/Navigation/Navigation";
import { useNavigate } from 'react-router-dom';
import {Spinner} from "../common/Spinner/Spinner";
import './Login.css';

export const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const Login = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/login/${email}/${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });


            // console.log(res.status);

            if (res.status === 400 || res.status === 500) {
                const error = await res.json();
                alert(`Error occurred: ${error.message}`);
                return;
            }
            if (res.status === 200) {

                navigate('/todo');
            }
        } finally {
            setLoading(false);
        }


    };

    if (loading) {
        return (
            <Spinner/>
        )
    };

    return (
        <div className="container">
            <Navigation/>
            <h2>Login</h2>
            <br/>
            <form className="log-form" onSubmit={Login}>
                <label>Email: </label>

                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br/>
                <label>Password: </label>

                <input
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Login</button>
            </form>



        </div>
    )
}