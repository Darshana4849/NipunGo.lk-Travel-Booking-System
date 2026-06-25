import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({
  placeholder = 'Search...',
  redirectTo = '/destinations',
  onSearch,
  initialValue = '',
  className = '',
}) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      const path = query.trim()
        ? `${redirectTo}?search=${encodeURIComponent(query.trim())}`
        : redirectTo;
      navigate(path);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-12 pr-12"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-secondary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-secondary-700 transition-colors"
      >
        Go
      </button>
    </form>
  );
};

export default SearchBar;
