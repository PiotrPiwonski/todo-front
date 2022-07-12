import React, {useState} from "react";
import {Link, Outlet} from "react-router-dom";
import {Spinner} from "../../common/Spinner/Spinner";
import { Btn } from "../../../src/common/Btn";
import './Navigation.css';

type Id = {
    id: string;
}


export const NavigationUser = (id: Id) => {
    const [loading, setLoading] = useState<boolean>(false);
    const logOut = async () => {
        setLoading(true);
        try {
            await fetch(`http://localhost:3001/login/${id}`);
        }catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Spinner/>
        )

    }

    return (
        <div className="nav">
            <h1>Todo List</h1>
            <nav className="navigation">
                <Link to="/" onClick={logOut}><Btn text="LogOut"/></Link>
            </nav>
            <Outlet />
        </div>
    )
}