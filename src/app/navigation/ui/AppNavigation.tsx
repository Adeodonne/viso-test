import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AllRecipes } from '../../../views/AllRecipes';
import { RecipeDetails } from '../../../views/RecipeDetails';
import { PickedRecipes } from '../../../views/PickedRecipes';

export const AppNavigator = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/picked-recipes" element={<PickedRecipes />} />
      </Routes>
    </BrowserRouter>
  );
};
