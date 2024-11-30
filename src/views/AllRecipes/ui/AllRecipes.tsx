import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRecipeId } from '../../../entities/pickedRecipes/model/pickedRecipes';
import { List } from '../../../shared/ui/Icon/ui/Icon';
import { CategoryFilter } from '../../../widgets/CategoryFilter/ui/CategoryFilter';
import { SearchInput } from '../../../widgets/SearchInput/ui/SearchInput';
import { RecipeCard } from '../../../widgets/RecipeCard/ui/RecipeCard';
import { Pagination } from '../../../widgets/Pagination/ui/Pagination';

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
    dispatch(addRecipeId(id));
  };

  return (
    <div className="p-4">
      <div className="w-8 h-8" onClick={() => navigate(`/picked-recipes`)}>
        <img src={List} alt={'List of picked recipes'} />
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <SearchInput
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onAddRecipe={addRecipeToPickedList}
            onRecipeClick={(id: number) => navigate(`/recipe/${id}`)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
