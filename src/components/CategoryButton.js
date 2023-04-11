import * as React from 'react';
import {useState} from "react";


function ButtonToggle(props) {
    let classNames = "ButtonToggle";
    if(props.active)
        classNames += " active"
    return (
        <button className={classNames} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export const types = [
    {   id: 1,
        type: '!',
        priority: 'high'
    },
    {
        id: 2,
        type: '!!',
        priority: 'mid'
    },
    {
        id: 3,
        type: '!!!',
        priority: 'low'
    }
];

export function CategoryButton(props) {
    const [active, setActive] = useState(types[types.length-1]);

    return (
        <div className="ButtonGroup">
            {types.map((type, index) => (
                <ButtonToggle
                key={index}
                active={type.type === active.type}
                onClick={() => {
                    setActive(types[index]);
                    if(props.setActiveCallback) props.setActiveCallback(types[index].id);
                }}
                >
                    {type.type}
                </ButtonToggle>
            ))}
        </div>
    );
}