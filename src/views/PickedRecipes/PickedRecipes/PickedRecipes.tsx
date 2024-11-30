import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../../app/storage/store';
import { selectRecipeIds } from '../../../entities/pickedRecipes/model/pickedRecipes';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  ingredients: { ingredient: string; measure: string }[];
}

export const PickedRecipes = () => {
  const recipeIds = useSelector((state: RootState) => selectRecipeIds(state));
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [allIngredients, setAllIngredients] = useState<Map<string, string>>(
    new Map()
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const mealPromises = recipeIds.map((id) =>
          axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          )
        );
        const mealResponses = await Promise.all(mealPromises);
        const fetchedRecipes = mealResponses.map((response) => {
          const meal = response.data.meals[0];

          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient !== "" && measure && measure !== "") {
              ingredients.push({ ingredient, measure });

              setAllIngredients((prevMap) => {
                const currentMeasurement = prevMap.get(ingredient);
                if (currentMeasurement) {
                  prevMap.set(
                    ingredient,
                    `${currentMeasurement} + ${measure}`
                  );
                } else {
                  prevMap.set(ingredient, measure);
                }
                return new Map(prevMap);
              });
            }
          }

          return {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            ingredients,
          };
        });
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    if (recipeIds.length > 0) {
      fetchRecipes();
    }

    console.log(recipeIds);
  }, [recipeIds]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="text-sm text-gray-700">
                  {ingredient.ingredient}: {ingredient.measure}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mt-12 mb-4">All Ingredients</h2>
      <ul className="list-disc pl-5">
        {Array.from(allIngredients.entries()).map(([ingredient, measure], idx) => (
          <li key={idx} className="text-sm text-gray-700">
            {ingredient}: {measure}
          </li>
        ))}
      </ul>
    </div>
  );
};
