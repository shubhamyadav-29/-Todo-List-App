import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleAdd() {
    if (inputValue.trim() === '') {
      setError('Please enter a task first!')
      return
    }
    onAdd(inputValue, priority, dueDate)
    setInputValue('')
    setPriority('medium')
    setDueDate('')
    setError('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="input-wrapper">
      <div className="input-row">
        <input
          className={`todo-input ${error ? 'input-error' : ''}`}
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            if (error) setError('')
          }}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* Priority + Due date row */}
      <div className="meta-row">
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>

        <input
          className="date-input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {error && <p className="error-msg">{error}</p>}
    </div>
  )
}

export default TodoInput