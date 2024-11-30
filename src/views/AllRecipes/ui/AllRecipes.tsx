import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeId, selectRecipeIds } from '../../../entities/pickedRecipes';
import { List } from '../../../shared/ui/Icon/ui/Icon';
import { CategoryFilter } from '../../../widgets/CategoryFilter';
import { SearchInput } from '../../../widgets/SearchInput';
import { RecipeCard } from '../../../widgets/RecipeCard';
import { Pagination } from '../../../widgets/Pagination';
import { RootState, AppDispatch } from '../../../app/storage/store';
import { fetchCategories } from '../../../entities/categories/model/slices/categoriesSlice';
import { fetchRecipes } from '../../../entities/recipes/model/slices/recipesSlice';

export const AllRecipes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pickedRecipeIds = useSelector(selectRecipeIds);

  const { categories } = useSelector((state: RootState) => state.categories);
  const { recipes, totalPages, allRecipes } = useSelector(
    (state: RootState) => state.recipes
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRecipes({ category: selectedCategory, searchQuery }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRecipes({ category: selectedCategory, searchQuery }));
  }, [dispatch, selectedCategory, searchQuery, allRecipes.length]);

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
      <div className="flex justify-between items-center">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div
          className="w-8 h-8 cursor-pointer"
          onClick={() => navigate(`/picked-recipes`)}
        >
          <img src={List} alt={'List of picked recipes'} />
        </div>
      </div>
      {selectedCategory === 'All' && (
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            isInList={pickedRecipeIds.includes(recipe.idMeal)}
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
