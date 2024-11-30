import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="search" className="block text-lg font-semibold mb-2">
        Search Recipes:
      </label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search for a recipe..."
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

