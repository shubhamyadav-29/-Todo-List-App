import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  function handleAddTodo() {
    if (inputValue.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  // ✅ NEW: Toggle completed true/false for a specific todo
  function handleToggle(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // ✅ NEW: Remove a todo by filtering it out
  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // ✅ NEW: Add task when user presses Enter key
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAddTodo()
  }

  return (
    <div className="container">
      <h1 className="title">My Todos</h1>

      <div className="input-row">
        <input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>

            {/* Checkbox to toggle complete */}
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />

            {/* Task text */}
            <span className="todo-text">{todo.text}</span>

            {/* Delete button */}
            <button
              className="delete-btn"
              onClick={() => handleDelete(todo.id)}
            >
              ✕
            </button>

          </li>
        ))}
      </ul>

      {/* ✅ NEW: Show count of remaining tasks */}
      {todos.length > 0 && (
        <p className="todo-count">
          {todos.filter(t => !t.completed).length} task(s) remaining
        </p>
      )}
    </div>
  )
}

export default App