const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`btn ${activeFilter === filter.key ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
