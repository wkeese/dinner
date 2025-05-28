import { meals } from "./meals.mjs";

let possibleMeals = meals.map(meal => meal.name);

// Update possible meals depending on which checkboxes are checked.
document.querySelector("ingredient-list").addEventListener("change", ({detail: {selectedIngredients }}) => {
  const possibleMeals = selectedIngredients.size > 0  ? meals.filter(meal => selectedIngredients.intersection(meal.ingredients).size > 0).map(meal => meal.name) : [];
  document.querySelector("meal-picker").setAttribute("filter", possibleMeals);
  document.querySelector("meal-list").setAttribute("filter", possibleMeals);
});
