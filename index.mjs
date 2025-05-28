import { meals } from "./meals.mjs";

let possibleMeals = meals.map(meal => meal.name);

// Update possible meals depending on which checkboxes are checked.
document.querySelector("ingredients-list").addEventListener("change", ({detail: {selectedIngredients }}) => {
  possibleMeals = (selectedIngredients.size > 0  ? meals.filter(meal => selectedIngredients.intersection(meal.ingredients).size > 0) : meals).map(meal => meal.name);
  document.querySelector("meals-list").setAttribute("filter", selectedIngredients.size > 0 ? possibleMeals : "");
  document.getElementById("result").innerHTML = "&nbsp;";
});

// Button to randomly pick a meal.
let pickedMealIndex;
document.getElementById ("pickOneButton").addEventListener("click", () => {
  let pickedMeal = "";
  if (possibleMeals.length > 0) {
    // Pick a meal that's (if possible) different from the previous one.
    let newPickedMealIndex = Math.floor(Math.random() * possibleMeals.length);
    if (newPickedMealIndex === pickedMealIndex) newPickedMealIndex = (pickedMealIndex + 1) % possibleMeals.length;

    pickedMeal = possibleMeals[newPickedMealIndex];
  }

  // Display new text with a transition effect.
  function setText () {
    document.getElementById("result").textContent = pickedMeal;
  }
  if (document.startViewTransition) {
    document.startViewTransition(setText);
  } else {
    setText();
  }
});
