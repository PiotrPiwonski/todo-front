import React, {FormEvent, useState} from "react";
import {Navigation} from "../components/Navigation/Navigation";
import { useNavigate } from 'react-router-dom';
import {Spinner} from "../common/Spinner/Spinner";
import './Login.css';

export const RegisterView = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

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
            const res = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (res.status === 400 || res.status === 500) {
                const error = await res.json();
                alert(`Error occurred: ${error.message}`);
                return;
            }
            navigate('/');
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return (
            <Spinner/>
        )
    }


    return (
        <div className="container">
            <Navigation/>
            <h2>Register</h2>
            <br/>
            <form className="log-form" onSubmit={sendForm}>
                <label>Name: </label>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
                <br/>
                <label>Email: </label>
                <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input
                    type="password"
                    placeholder="Set Password"
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}
                />
                <br/>
                <label>Confirm Password: </label>
                <input
                    type="password"
                    placeholder="Repeat Password"
                    value={form.confirmPassword}
                    onChange={e => updateForm('confirmPassword', e.target.value)}
                />
                <br/>
                <button type="submit">Register</button>
            </form>

        </div>

    )
}