import TodoItem from './TodoItem'

function TodoList({ todos, filter, onToggle, onDelete, onEdit }) {

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (filteredTodos.length === 0) {
    return (
      <p className="empty-msg">
        {filter === 'completed' ? 'No completed tasks yet.' :
         filter === 'active' ? 'Nothing left to do! 🎉' :
         'Add your first task above.'}
      </p>
    )
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default TodoList