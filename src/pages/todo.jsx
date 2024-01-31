import { useState, useEffect } from "react";
import "../styles/todo.css";

function TodoApp() {
  //Initialize state from localstorage, if none, then give state an empty array
  const [todoList, setTodos] = useState(JSON.parse(localStorage.todos || "[]"));

  //Everytime todoList is updated, save to localstorage
  useEffect(() => {
    localStorage.todos = JSON.stringify(todoList);
  }, [todoList]);

  function toggleTodo(id) {
    const newTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  }

  function addTodo(e) {
    setTodos([
      { id: Date.now(), todo: e.target.value, done: false },
      ...todoList,
    ]);
    e.target.value = "";
  }

  function removeTodo(id) {
    setTodos(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <div className="todo-container">
      <h1 id="todoTitle">To Do List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todoList={todoList}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
}

function TodoInput({ addTodo }) {
  return (
    <>
      <div id="todo-input-underline" />
      <input
        autoComplete="off"
        id="todo-input"
        type="text"
        placeholder="Add To-Do!"
        onKeyDown={(e) => e.key === "Enter" && addTodo(e)}
      />
    </>
  );
}

function TodoList({ todoList, toggleTodo, removeTodo }) {
  const renderedList = todoList.map((todo, index) => (
    <Todo
      key={todo.id}
      todoItem={todo}
      toggleTodo={toggleTodo}
      removeTodo={removeTodo}
    />
  ));
  return <section id="todo-list">{renderedList}</section>;
}

function Todo({ todoItem, toggleTodo, removeTodo }) {
  return (
    <section className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todoItem.done}
          onChange={() => toggleTodo(todoItem.id)}
        />
        <span className="cb"></span>
        <span className="todo">{todoItem.todo}</span>
      </label>
      <button className="close" onClick={() => removeTodo(todoItem.id)}>
        &times;
      </button>
    </section>
  );
}

export default TodoApp;
