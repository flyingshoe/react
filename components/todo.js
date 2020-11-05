import React, { useState, useEffect } from "react";
import "../styles/todo.css";

function TodoApp() {
  const [todoList, setTodos] = useState(JSON.parse(localStorage.todos || "[]"));
  useEffect(() => {
    localStorage.todos = JSON.stringify(todoList);
  }, [todoList]);
  function toggleTodos(index) {
    const newTodos = todoList.slice();
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }
  function addTodo(e) {
    if (e.key === "Enter") {
      const newTodos = todoList.slice();
      newTodos.push({ todo: e.target.value, done: false });
      setTodos(newTodos);
      e.target.value = "";
    }
  }
  function removeTodo(index) {
    const newTodos = todoList.slice();
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="todo-container">
      <h1 id='todoTitle'>To Do List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todoList={todoList}
        toggleTodos={toggleTodos}
        removeTodo={removeTodo}
      />
    </div>
  );
}
function TodoInput(props) {
  return (
    <>
      <div id="todo-input-underline"></div>
      <input
        autoComplete="off"
        id="todo-input"
        type="text"
        placeholder="Add To-Do!"
        onKeyDown={props.addTodo}
      />
    </>
  );
}
function TodoList(props) {
  const renderedList = props.todoList.map((todo, index) => (
    <Todo
      todoItem={todo}
      key={index}
      id={index}
      toggleTodos={props.toggleTodos}
      removeTodo={props.removeTodo}
    />
  ));
  return <section id="todo-list">{renderedList}</section>;
}
function Todo(props) {
  return (
    <section className="todo-item">
      <button className="close" onClick={() => props.removeTodo(props.id)}>
        ×
      </button>
      <label>
        <input
          type="checkbox"
          checked={props.todoItem.done}
          onChange={() => props.toggleTodos(props.id)}
        />
        <span className="cb"></span>
        <span className="todo">{props.todoItem.todo}</span>
      </label>
    </section>
  );
}

export default TodoApp;
