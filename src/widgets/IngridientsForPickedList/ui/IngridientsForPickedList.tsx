import React from 'react';

interface IngredientListProps {
  ingredients: Map<string, string>;
}

export const IngridientsForPickedList: React.FC<IngredientListProps> = ({
  ingredients,
}) => {
  return (
    <ul className="list-disc pl-5">
      {Array.from(ingredients.entries()).map(([ingredient, measure], idx) => (
        <li key={idx} className="text-sm text-gray-700">
          {ingredient}: {measure}
        </li>
      ))}
    </ul>
  );
};
