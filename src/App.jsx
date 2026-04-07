import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import FilterTabs from './components/FilterTabs'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  function handleAddTodo(text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  function handleToggle(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const remainingCount = todos.filter(t => !t.completed).length

  return (
    <div className="container">
      <Header remaining={remainingCount} />
      <TodoInput onAdd={handleAddTodo} />
      <FilterTabs filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={todos}
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App