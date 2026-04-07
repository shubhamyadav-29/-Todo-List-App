import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)

  function handleEditSave() {
    if (editValue.trim() === '') return
    onEdit(todo.id, editValue)
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') {
      setEditValue(todo.text)
      setIsEditing(false)
    }
  }

  // Check if due date has passed
  const isOverdue = todo.dueDate && !todo.completed &&
    new Date(todo.dueDate) < new Date(new Date().toDateString())

  const priorityClass = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  }[todo.priority] || 'priority-medium'

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>

      {/* Priority bar on left side */}
      <span className={`priority-bar ${priorityClass}`}></span>

      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <div className="todo-content">
        {isEditing ? (
          <input
            className="edit-input"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEditSave}
            autoFocus
          />
        ) : (
          <span
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
            title="Double click to edit"
          >
            {todo.text}
          </span>
        )}

        {/* Due date tag */}
        {todo.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            📅 {isOverdue ? 'Overdue: ' : ''}{todo.dueDate}
          </span>
        )}
      </div>

      {!todo.completed && (
        <button
          className="edit-btn"
          onClick={() => isEditing ? handleEditSave() : setIsEditing(true)}
        >
          {isEditing ? '✓' : '✎'}
        </button>
      )}

      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ✕
      </button>
    </li>
  )
}

export default TodoItem