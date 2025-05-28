import {ingredients} from './ingredients.mjs';

/**
 * Set of toggle buttons for each ingredient.
 */
class IngredientList extends HTMLElement {
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
          column-width: 16rem;
     }
  
      button {
          display: flex;
          width: 14rem;
          flex-direction: row;
          justify-content: space-between;
          cursor: pointer;
          border: solid 1px transparent;
          background: white;
          padding: 5px;
          margin: 5px;
          transition: all 200ms;
          text-transform: capitalize;
  
          &::after {
              /* To prevent height change, always render checkbox, but toggle visibility. */
              content: "✅";
              visibility: hidden;
          }
  
          &[aria-pressed="true"] {
              border-color: black;
              background: beige;
  
              &::after {
                  visibility: visible;
              }
          }
      }
    `;
    shadow.appendChild(style);

    // Create list.
    const list = document.createElement("ul");
    list.innerHTML = ingredients.map(ingredient =>
      `<li>
      <button id="${ingredient.name}" aria-pressed="false">
          ${ingredient.icon} ${ingredient.name}
      </button>
      </li>`).join("");
    shadow.appendChild(list);

    // Update list when clicked.
    list.addEventListener("click", (event) => {
      const button = event.target;

      // Toggle aria-pressed attribute for accessibility and styling.
      const currentValue = button.getAttribute("aria-pressed");
      if (currentValue === "false") {
        button.setAttribute("aria-pressed", "true");
        this.value.add(button.id);
      } else {
        button.setAttribute("aria-pressed", "false");
        this.value.delete(button.id);
      }

      this.dispatchEvent(new CustomEvent(
        "change",
        {detail: {selectedIngredients: this.value}},
      ));
    });
  }
}

customElements.define("ingredient-list", IngredientList);
