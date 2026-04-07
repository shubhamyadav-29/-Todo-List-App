function FilterTabs({ filter, onFilterChange }) {
  return (
    <div className="filter-tabs">
      {['all', 'active', 'completed'].map((tab) => (
        <button
          key={tab}
          className={`filter-btn ${filter === tab ? 'active' : ''}`}
          onClick={() => onFilterChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs