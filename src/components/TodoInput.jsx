import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('')

  function handleAdd() {
    if (inputValue.trim() === '') return
    onAdd(inputValue)        // send value up to App
    setInputValue('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="input-row">
      <input
        className="todo-input"
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  )
}

export default TodoInput