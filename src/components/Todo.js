import React, {useState} from 'react';
import TodoForm from "./TodoForm"; // importeert TodoForm-component
import {TiEdit} from "react-icons/ti"; // importeert edit icoon van react-icons/ti-pakket
import {RiCloseCircleLine} from "react-icons/ri"; // importeert close icoon van react-icons/ri-pakket

function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    // definieert een staat (state) met de useState-hook
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    // deze functie wordt uitgevoerd wanneer de gebruiker een todo bijwerkt
    const submitUpdate = value => {
        updateTodo(edit.id, value); // update de todo
        setEdit({ // reset de staat
            id: null,
            value: ''
        });
    };

    // als er een todo is die momenteel wordt bewerkt, toon de TodoForm-component
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    // toon de lijst met todos in div-elementen
    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text} {/* toont de tekst van de todo */}
            </div>
            <div className="icons">
                {/* toont het close icoon en voert de removeTodo-functie uit wanneer erop wordt geklikt */}
                <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className="delete-icon" />
                {/* toont het edit icoon en stelt de staat in wanneer erop wordt geklikt */}
                <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text})} className="edit-icon" />
            </div>
        </div>
    ));
}

export default Todo;