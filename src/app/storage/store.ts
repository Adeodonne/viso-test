import { configureStore } from '@reduxjs/toolkit';
import { pickedRecipesReducer } from '../../entities/pickedRecipes/model/slices/pickedRecipes';
import { categoryReducer } from '../../entities/categories/model/slices/categoriesSlice';
import { recipesReducer } from '../../entities/recipes/model/slices/recipesSlice';
import { recipeDetailsReducer } from '../../entities/recipeDetails/model/slices/recipeDetailsSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    recipes: recipesReducer,
    pickedRecipes: pickedRecipesReducer,
    recipeDetails: recipeDetailsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
