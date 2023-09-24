
import { postNewBookedRoom } from "./apiCalls"
import { getAllCustomerBookings } from "./customer-bookings"


const dashboardPage = document.querySelector(".dashboard-page");
const loginPage = document.querySelector(".login-page");
const pastCustomerBookings = document.querySelector("#past-customer-bookings")
const futureCustomerBookings = document.querySelector("#future-customer-bookings")

export const loadDashboardPage = (pastCustomerRooms, upcomingCustomerRooms) => {
  dashboardPage.classList.remove("hidden")
  loginPage.classList.add("hidden")
  renderPastAndUpcomingBookingsCards(pastCustomerRooms, upcomingCustomerRooms)
}

export const renderPastAndUpcomingBookingsCards = (pastCustomerRooms, upcomingCustomerRooms) => {
  
  pastCustomerRooms.forEach((room) => {
    pastCustomerBookings.innerHTML += //need to add card after card
    `<div class="past-booking-cards">
      <p>Room number: ${room.number} </p>
      <p>Room type: ${room.roomType} </p>
      <p>Bed type: ${room.bedSize} </p>
      <p>Number of beds: ${room.numBeds} </p>
      <p>Date: ${room.date} </p>
    </div>
    `
  });

  upcomingCustomerRooms.forEach((room) => {
    futureCustomerBookings.innerHTML += 
    `<div class="future-booking-cards">
    <p>Room number: ${room.number} </p>
    <p>Room type: ${room.roomType} </p>
    <p>Bed type: ${room.bedSize} </p>
    <p>Number of beds: ${room.numBeds} </p>
    <p>Date: ${room.date} </p>
  </div>
    `
  });






}


