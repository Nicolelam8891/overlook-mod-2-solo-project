
import { postNewBookedRoom } from "./apiCalls"
import { getAllCustomerBookings } from "./customer-bookings"


const dashboardPage = document.querySelector(".dashboard-page");
const loginPage = document.querySelector(".login-page");
const pastCustomerBookings = document.querySelector("#past-customer-bookings")

export const loadDashboardPage = (pastCustomerRooms) => {
  dashboardPage.classList.remove("hidden")
  loginPage.classList.add("hidden")
  renderPastBookingsCard(pastCustomerRooms)
}

export const renderPastBookingsCard = (pastCustomerRooms) => {
  pastCustomerRooms.forEach((room) => {
    pastCustomerBookings.innerHTML += //need to add card after card
    `<div class="past-booking-card">
      <p>Room number: ${room.number} </p>
      <p>Room type: ${room.roomType} </p>
      <p>Bed Type: ${room.bedSize} </p>
      <p>Number of beds: ${room.numBeds} </p>
      <p>Date: ${room.date} </p>
    </div>
    `
  })



}


