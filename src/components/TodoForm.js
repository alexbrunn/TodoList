import React, {useState, useEffect, useRef} from 'react';
import {types} from "./CategoryButton";

function TodoForm(props) {
    // definieert een staat (state) voor het inputveld en gebruikt de waarde van props.edit.value als de standaardwaarde (default value)
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    // Maak het invoerveld gefocust zodat de gebruiker direct kan typen
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    });

    // deze functie wordt uitgevoerd wanneer de gebruiker het inputveld wijzigt
    const handleChange =e => {
        setInput(e.target.value)
    };

    // deze functie wordt uitgevoerd wanneer de gebruiker het formulier indient
    const handleSubmit =e => {
        e.preventDefault();

        // Geeft een willekeurig ID-nummer aan de invoertekst en slaat deze op in de console
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            typeId: types[types.length - 1].id
        });

        // Vernieuwt het invoerveld na het indienen
        setInput('');
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                // toont de update-inputveld en -knop als de gebruiker een todo bewerkt
                <>
                    <input
                        type="text"
                        placeholder="Update todo"
                        value={input}
                        name="text"
                        className="todo-input"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button">Update todo</button>
                </>
            ) : (
                // toont het add-inputveld en -knop als de gebruiker een nieuwe todo wil toevoegen
                <>
                    <input
                        type="text"
                        placeholder="Add a todo"
                        value={input}
                        name="text"
                        className="todo-input"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button">Add todo</button>
                </>
            )}
        </form>
    );
}

export default TodoForm;