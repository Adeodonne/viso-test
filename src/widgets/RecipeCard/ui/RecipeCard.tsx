import React from 'react';
import { AddedToList, AddRecipe } from '../../../shared/ui/Icon/ui/Icon';

interface RecipeCardProps {
  recipe: any;
  isInList: boolean;
  onAddRecipe: (id: number) => void;
  onRecipeClick: (id: number) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isInList = false,
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
      <div className="flex justify-between flex-row mt-1">
        <h3 className="text-lg font-semibold mt-2">{recipe.strMeal}</h3>
        <div
          className="w-10 h-10"
          onClick={(event) => {
            event.stopPropagation();
            onAddRecipe(recipe.idMeal);
          }}
        >
          <img src={isInList ? AddedToList : AddRecipe} alt={'Add to list'} />
        </div>
      </div>
    </div>
  );
};
