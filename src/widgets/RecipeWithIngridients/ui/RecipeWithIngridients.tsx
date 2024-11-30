import React from 'react';

interface Ingredient {
  ingredient: string;
  measure: string;
}

interface RecipeCardProps {
  strMeal: string;
  strMealThumb: string;
  ingredients: Ingredient[];
}

export const RecipeWithIngridients: React.FC<RecipeCardProps> = ({
  strMeal,
  strMealThumb,
  ingredients,
}) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300">
      <img
        src={strMealThumb}
        alt={strMeal}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{strMeal}</h2>
      <ul className="list-disc pl-5">
        {ingredients.map((ingredient, idx) => (
          <li key={idx} className="text-sm text-gray-700">
            {ingredient.ingredient}: {ingredient.measure}
          </li>
        ))}
      </ul>
    </div>
  );
};
