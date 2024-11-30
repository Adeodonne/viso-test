import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-lg font-semibold mb-2">
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={onCategoryChange}
        className="border p-2 rounded w-full"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
