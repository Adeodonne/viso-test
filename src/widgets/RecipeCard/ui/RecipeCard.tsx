import React from 'react';
import { AddRecipe } from '../../../shared/ui/Icon/ui/Icon';

interface RecipeCardProps {
  recipe: any;
  onAddRecipe: (id: number) => void;
  onRecipeClick: (id: number) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onAddRecipe,
  onRecipeClick,
}) => {
  return (
    <div
      key={recipe.idMeal}
      className="border p-4 rounded shadow-md bg-white cursor-pointer"
      onClick={() => onRecipeClick(recipe.idMeal)}
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
          onAddRecipe(recipe.idMeal);
        }}
      >
        <img src={AddRecipe} alt={'Add to list'} />
      </div>
    </div>
  );
};
