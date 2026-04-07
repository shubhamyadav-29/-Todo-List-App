import { useState, useEffect } from 'react'

function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [filter, setFilter] = useState('all')

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(text, priority = 'medium', dueDate = '') {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      dueDate,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  function toggleTodo(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function editTodo(id, newText) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const remainingCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    remainingCount,
    completedCount
  }
}

export default useTodos