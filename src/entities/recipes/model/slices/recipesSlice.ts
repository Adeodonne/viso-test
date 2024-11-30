import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Recipe {
  idMeal: number;
  strMeal: string;
  strMealThumb: string;
}

interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  allRecipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
  totalPages: 0,
  allRecipes: [],
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (params: { category: string; searchQuery: string }) => {
    const { category, searchQuery } = params;
    console.log(searchQuery);
    const endpoint =
      category === 'All'
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    return {
      recipes: data.meals || [],
      totalPages: Math.ceil((data.meals?.length || 0) / 10),
    };
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.recipes;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
