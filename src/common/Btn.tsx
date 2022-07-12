import React from "react";
import './Btn.css';

interface Props {
    text: string;
}

export const Btn = (props: Props) => {
    return (
        <button className="btn">{props.text}</button>
    )
};