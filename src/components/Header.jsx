function Header({ remaining }) {
  return (
    <div className="header">
      <h1 className="title">My Todos</h1>
      {remaining > 0 && (
        <span className="remaining-badge">{remaining} left</span>
      )}
    </div>
  )
}

export default Header