import './App.css'
import useTodos from './hooks/useTodos'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import FilterTabs from './components/FilterTabs'
import TodoList from './components/TodoList'

function App() {
  const {
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
  } = useTodos()

  return (
    <div className="container">
      <Header
        remaining={remainingCount}
        completedCount={completedCount}
        onClearCompleted={clearCompleted}
      />
      <TodoInput onAdd={addTodo} />
      <FilterTabs filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={todos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  )
}

export default App