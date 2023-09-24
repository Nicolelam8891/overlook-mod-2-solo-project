
import { postNewBookedRoom } from "./apiCalls"
import { getAllCustomerBookings } from "./customer-bookings"


const dashboardPage = document.querySelector(".dashboard-page");
const loginPage = document.querySelector(".login-page");

export const loadDashboardPage = () => {
  dashboardPage.classList.remove("hidden")
  loginPage.classList.add("hidden")
}

const renderRecipeCards = (recipeList) => {
  recipeContainer.innerHTML = " ";
  recipeList.forEach((recipe) => {
    if (recipe.tags.length === 0) {
      recipeContainer.innerHTML += `
      <div class="recipe recipe-card" id="${recipe.name}">
        <img class="recipe-card" role="button"
          src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
        />
        <h3 class="recipe-tag recipe-card" id="${recipe.name}">category not indicated</h3>
        <h4 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h4>
      </div>`;
    } else {
      recipeContainer.innerHTML += `
      <div class="recipe recipe-card" id="${recipe.name}">
        <img class="recipe-card" role="button"
          src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
        />
        <h3 class="recipe-tag recipe-card" id="${recipe.name}">${recipe.tags[0]}</h3>
        <h4 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h4>
      </div>`;
    }
  });
};

