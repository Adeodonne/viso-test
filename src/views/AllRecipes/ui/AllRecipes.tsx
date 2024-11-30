import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRecipeId } from '../../../entities/pickedRecipes/model/pickedRecipes';
import {
  AddRecipe,
  ArrowLeft,
  ArrowRight,
  List,
} from '../../../shared/ui/Icon/ui/Icon';

export const AllRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
      );
      const data = await response.json();
      setCategories([
        'All',
        ...data.meals.map((category: any) => category.strCategory),
      ]);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const endpoint =
        selectedCategory === 'All'
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchQuery}`
          : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      setRecipes(data.meals || []);
      setTotalPages(Math.ceil((data.meals?.length || 0) / itemsPerPage));
      setCurrentPage(1);
    };

    fetchRecipes();
  }, [selectedCategory, debouncedSearchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addRecipeToPickedList = (id: number) => {
    console.log(id);
    dispatch(addRecipeId(id));
  };

  const renderPagination = () => {
    const pages: JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 border rounded ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="p-4">
      <div className="w-8 h-8" onClick={() => navigate(`/picked-recipes`)}>
        <img src={List} alt={'List of picked recipes'} />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg font-semibold mb-2">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded w-full"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="search" className="block text-lg font-semibold mb-2">
          Search Recipes:
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a recipe..."
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedRecipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="border p-4 rounded shadow-md bg-white cursor-pointer"
            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{recipe.strMeal}</h3>
            <div
              className="bg-green-500 w-2 h-2"
              onClick={(event) => {
                event.stopPropagation();
                addRecipeToPickedList(recipe.idMeal);
              }}
            >
              <img src={AddRecipe} alt={'Add to list'} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(1)}
          className={`px-4 py-2 w-10 h-10 border rounded mr-2 ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-white text-blue-500'
          }`}
          disabled={currentPage === 1}
        >
          <img src={ArrowLeft} />
        </button>
        <div className="flex space-x-2">{renderPagination()}</div>
        <button
          onClick={() => handlePageChange(totalPages)}
          className={`px-4 py-2 w-10 h-10 border rounded ml-2 ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-white text-blue-500'
          }`}
          disabled={currentPage === totalPages}
        >
          <img src={ArrowRight} />
        </button>
      </div>
    </div>
  );
};
