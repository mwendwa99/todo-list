import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const initialTodos = [
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build a todo app", completed: false },
      ];

      setTodos(initialTodos);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const newId = Math.max(0, ...todos.map((t) => t.id)) + 1;
    setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
    setNewTodo("");
    setLoading(false);
  };

  const toggleTodo = async (id) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    setLoading(false);
  };

  const deleteTodo = async (id) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    setTodos(todos.filter((todo) => todo.id !== id));
    setLoading(false);
  };

  return (
    <div className="app">
      <img
        src="/images/todo.jpg"
        alt="Todo list image"
        className="todo-image"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/fallback.jpg";
        }}
      />
      <div className="todo-container">
        <h1>Todo List</h1>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            disabled={loading}
            className="todo-input"
          />
          <button
            type="submit"
            disabled={loading || !newTodo.trim()}
            className="add-btn"
          >
            Add
          </button>
        </form>

        {loading && <div className="loading">Loading...</div>}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {!loading && todos.length === 0 && (
          <p className="empty-message">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default App;
