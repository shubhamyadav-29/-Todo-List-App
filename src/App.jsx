import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  // ✅ NEW: track which filter is active
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'completed'

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

  function handleToggle(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAddTodo()
  }

  // ✅ NEW: derived state — we don't store this in useState
  // we calculate it from existing state every render
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true // 'all'
  })

  const remainingCount = todos.filter(t => !t.completed).length

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

      {/* ✅ NEW: Filter tabs */}
      <div className="filter-tabs">
        {['all', 'active', 'completed'].map((tab) => (
          <button
            key={tab}
            className={`filter-btn ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {/* Capitalize first letter */}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ NEW: Empty state message */}
      {filteredTodos.length === 0 && (
        <p className="empty-msg">
          {filter === 'completed' ? 'No completed tasks yet.' :
           filter === 'active' ? 'Nothing left to do! 🎉' :
           'Add your first task above.'}
        </p>
      )}

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(todo.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <p className="todo-count">
          {remainingCount} task(s) remaining
        </p>
      )}
    </div>
  )
}

export default App