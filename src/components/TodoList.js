import React, {useEffect, useState} from 'react';
import TodoForm from "./TodoForm";
import TodoComponent from "./TodoComponent";
import {CategoryButton, types} from "./CategoryButton";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [active, setActive] = useState();
    const [filteredTodos, setFilteredTodos] = useState([])

    useEffect(() => {
        filterTodos();
    }, [active, todos]);

    // Functie om nieuwe taak toe te voegen
    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        // Voeg nieuwe taak toe aan lijst van taken
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    // Functie om taak bij te werken
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prevState => {
            return prevState.map(item => (item.id === todoId ? newValue : item))
        });
    };

    // Functie om taak te verwijderen
    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    }

    const filterTodos = () => {
        console.log("FilterTodos");
        if(!active) setFilteredTodos(todos);
        else {
            setFilteredTodos(todos.filter(todo => {
                return todo.typeId === active
            }))
            console.log("Should filter now");
            // setFilteredTodos(todos);
        }
    }

    // Functie om taak als voltooid te markeren
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>Wat is het plan voor vandaag?</h1>
            <TodoForm onSubmit={addTodo}/>
            <CategoryButton setActiveCallback={setActive}/>
            <TodoComponent todos={filteredTodos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    );
}

export default TodoList;