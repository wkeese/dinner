import { ingredients } from "./ingredients.mjs";
import { meals } from "./meals.mjs";

// Data consistency checking.
// I used to extract the ingredients from meals.mjs, but I made a dedicated ingredients.mjs so I could add icons.
const ingredients2 = new Set(meals.flatMap(meal => Array.from(meal.ingredients)));
const missingIngredients = ingredients2.difference(new Set(Array.from(ingredients).map(ingredient => ingredient.name)));
if (missingIngredients.size > 0) {
  console.warn("Ingredients in meals.mjs not in ingredients.mjs:", missingIngredients);
}

// Display list of  meals.
document.getElementById("meals").innerHTML = meals.sort((a, b) => {
  return a.name > b.name ? 1 : -1;
}).map(meal =>
  `<li id="${meal.name}">${meal.icon} ${meal.name}</li>`).join("");

// Update possible meals depending on which checkboxes are checked.
let possibleMeals = meals.map(meal => meal.name);
document.querySelector("ingredients-list").addEventListener("change", ({detail: {selectedIngredients }}) => {
    document.getElementById("meals").classList.toggle("filtered", selectedIngredients.size > 0);

    // Find meals with any of the selected ingredients.
    // Alternative is to find meal with all the selected ingredients.
    possibleMeals = (selectedIngredients.size > 0  ? meals.filter(meal => selectedIngredients.intersection(meal.ingredients).size > 0) : meals).map(meal => meal.name);

    // Gray out invalid meals, and highlight ones that are still valid.
    for(const meal of document.querySelectorAll("#meals li")) {
      const included = possibleMeals.includes(meal.id)
      meal.classList.toggle("matched", selectedIngredients.size > 0 && included);
    }

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
