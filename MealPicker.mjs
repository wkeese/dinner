import {meals} from './meals.mjs';

/**
 * Button to pick one of the possible meals.
 */
class MealPicker extends HTMLElement {
  static observedAttributes = ["filter"];

  // Lifecycle methods
  connectedCallback() {
    this.value = new Set();

    // Create a shadow root
    const shadow = this.attachShadow({mode: "open"});

    // Create some CSS to apply to the shadow dom.
    const style = document.createElement("style");
    style.textContent = `
      .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          font-size: 150%;
          gap: 10px;
      }
      
      button {
          font-size: 150%;
          border: none;
          background: none !important;
          cursor: grab;
      
          animation: spin 4s linear infinite;
      }
      
      @keyframes spin {
          100% {
              transform: rotate(360deg);
          }
      }
    `;
    shadow.appendChild(style);

    // Create container.
    const container = this.container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
        <button type="button">🎲</button>
        →
        <span class="result">&nbsp;</span>
    `;
    shadow.appendChild(container);

    this.button = this.container.querySelector("button");
    this.result = this.container.querySelector(".result");

    this.possibleMeals = meals.map(meal => meal.name);

    // When button clicked, pick a meal.
    this.button.addEventListener("click", () => {
      let pickedMeal = "";
      if (this.possibleMeals.length > 0) {
        // Pick a meal that's (if possible) different from the previous one.
        let pickedMealIndex = Math.floor(Math.random() * this.possibleMeals.length);
        pickedMeal = this.possibleMeals[pickedMealIndex];
        if (pickedMeal === this.result.textContent)
          pickedMeal = this.possibleMeals[(pickedMealIndex + 1) % this.possibleMeals.length];
      }

      // Display new text with a transition effect.
      const setText = () => { this.result.textContent = pickedMeal; }
      if (document.startViewTransition) {
        document.startViewTransition(setText);
      } else {
        setText();
      }
    });
  }

  attributeChangedCallback(name, oldValue, filter) {
    if (name === "filter") {
      this.possibleMeals = filter?.split(",") ?? meals.map(meal => meal.name);
      this.result.innerHTML = "&nbsp;";
    }
  }

}

customElements.define("meal-picker", MealPicker);
