import { configureStore } from '@reduxjs/toolkit';
import { recipeReducer } from '../../entities/pickedRecipes/model/pickedRecipes';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
