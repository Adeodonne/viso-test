import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipeState {
  ids: number[];
}

const initialState: RecipeState = {
  ids: [],
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipeId(state, action: PayloadAction<number>) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
  },
});

export const { addRecipeId } = recipeSlice.actions;

export const selectRecipeIds = (state: { recipes: RecipeState }) => state.recipes.ids;

export const recipeReducer = recipeSlice.reducer;
