import React from "react";
import {Link, Outlet} from "react-router-dom";
import { Btn } from "../../../src/common/Btn";
import './Navigation.css';

export const Navigation = () => {
    return (
        <div className="nav">
            <h1>Todo List</h1>
            <nav className="navigation">

                <Link to="/login"><Btn text="Login"/></Link>
                <Link to="/register"><Btn text="Register"/></Link>
            </nav>
            <Outlet />
        </div>
    )
}