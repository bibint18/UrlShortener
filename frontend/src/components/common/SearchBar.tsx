import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Trigger search on input change
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Clear search
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by original URL or short ID..."
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {query && (
        <button
          onClick={handleClear}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
      )}
    </div>
  );
};