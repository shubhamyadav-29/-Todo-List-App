function Header({ remaining, completedCount, onClearCompleted }) {
  return (
    <div className="header">
      <h1 className="title">My Todos</h1>
      <div className="header-actions">
        {remaining > 0 && (
          <span className="remaining-badge">{remaining} left</span>
        )}
        {completedCount > 0 && (
          <button className="clear-btn" onClick={onClearCompleted}>
            Clear done
          </button>
        )}
      </div>
    </div>
  )
}

export default Header