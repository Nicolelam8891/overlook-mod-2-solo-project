
import { postNewBookedRoom } from "./apiCalls"
import { getAllCustomerBookings } from "./customer-bookings"

const loginPage = document.querySelector(".login-page");
const dashboardPage = document.querySelector(".dashboard-page");
const pastCustomerBookings = document.querySelector("#past-customer-bookings")
const futureCustomerBookings = document.querySelector("#future-customer-bookings")
const modal = document.querySelector("#myModal");
const findRoomButton = document.querySelector(".find-rooms-button") //this is the button that opens the modal
const span = document.querySelector(".close"); //this is the <span> element that closes the modal. When you click on the x button, it will exit

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

/* event listeners here */ 
findRoomButton.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








