import { useState } from 'react'
import './App.css'

function App() {
  // useState gives us a variable + a function to update it
  // React re-renders the UI every time we call setTodos
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  function handleAddTodo() {
    // Don't add empty tasks
    if (inputValue.trim() === '') return

    const newTodo = {
      id: Date.now(),       // unique id using timestamp
      text: inputValue,
      completed: false
    }

    setTodos([...todos, newTodo])  // spread old todos, add new one
    setInputValue('')               // clear the input
  }

  return (
    <div className="container">
      <h1 className="title">My Todos</h1>

      {/* Input area */}
      <div className="input-row">
        <input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {/* Todo list */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App