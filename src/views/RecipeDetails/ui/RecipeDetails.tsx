import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setRecipe(data.meals?.[0]);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{recipe.strMeal}</h1>
      <p className="mt-2">{recipe.strInstructions}</p>
    </div>
  );
};
