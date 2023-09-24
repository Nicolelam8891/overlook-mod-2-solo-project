
import { postNewBookedRoom } from "./apiCalls"
import { getAllCustomerBookings } from "./customer-bookings"


const dashboardPage = document.querySelector(".dashboard-page");
const loginPage = document.querySelector(".login-page");

export const loadDashboardPage = () => {
  dashboardPage.classList.remove("hidden")
  loginPage.classList.add("hidden")
}



