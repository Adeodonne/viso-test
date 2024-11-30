import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/storage/store';
import { fetchRecipeDetails } from '../../../entities/recipeDetails/model/slices/recipeDetailsSlice';

export const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { recipe, loading, error } = useSelector(
    (state: RootState) => state.recipeDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="p-4 flex items-center space-x-8">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-1/2 h-auto object-cover rounded"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{recipe.strMeal}</h1>
        <p className="mt-2">{recipe.strInstructions}</p>
      </div>
    </div>
  );
};
