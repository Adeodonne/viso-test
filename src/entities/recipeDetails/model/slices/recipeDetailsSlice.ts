import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface RecipeState {
  recipe: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipe: null,
  loading: false,
  error: null,
};

export const fetchRecipeDetails = createAsyncThunk(
  'recipeDetails/fetchRecipeDetails',
  async (id: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals?.[0];
  }
);

const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load recipe';
      });
  },
});

export const recipeDetailsReducer = recipeDetailsSlice.reducer;
