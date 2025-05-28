import {meals} from './meals.mjs';

/**
 * List of meals, possibly filtered by selection in ingredients list.
 */
class MealList extends HTMLElement {
  static observedAttributes = ["filter"];

  // Lifecycle methods
  connectedCallback() {
    this.value = new Set();

    // Create a shadow root
    const shadow = this.attachShadow({mode: "open"});

    // Create some CSS to apply to the shadow dom.
    const style = document.createElement("style");
    style.textContent = `
      ul {
        list-style: none;
    
        /* Multi column layout. */
        column-count: auto;
        column-width: 20rem;
      }

      li {
          padding: 5px;
          text-transform: capitalize;
          transition: all 200ms;
      }

      /* Styling only for when one or more ingredients are selected. */
      ul.filtered li {
          &.matched {
              color: navy;
              font-size: 110%;
          }
  
          &:not(.matched) {
              padding: 0;
              font-size: 0;
          }
      }
    `;
    shadow.appendChild(style);

    // Create list.
    const list = this.list = document.createElement("ul");
    list.innerHTML = meals.map(meal =>
      `<li id="${meal.name}">${meal.icon} ${meal.name}</li>`).join("");
    shadow.appendChild(list);
  }

  attributeChangedCallback(name, oldValue, possibleMeals) {
    if (name === "filter") {
      // Gray out invalid meals, and highlight ones that are still valid.
      this.list.classList.toggle("filtered", possibleMeals);
      const possibleMealsSet = new Set(possibleMeals?.split(","));
      for(const meal of this.list.children) {
        meal.classList.toggle("matched", possibleMealsSet.has(meal.id));
      }
    }
  }
}

customElements.define("meal-list", MealList);
