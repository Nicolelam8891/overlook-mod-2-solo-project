import { postNewBookedRoom } from "./apiCalls";
import { getAllCustomerBookings, getAllRoomTypes } from "./customer-bookings";

/* QuerySelectors here */
const loginPage = document.querySelector(".login-page");
const dashboardPage = document.querySelector(".dashboard-page");
const pastCustomerBookings = document.querySelector("#past-customer-bookings");
const upcomingCustomerBookings = document.querySelector(
  "#upcoming-customer-bookings"
);
const dropDownMenu = document.querySelector(".drop-down-menu");
const availableRoomsBox = document.querySelector(".available-rooms-box");
const availableRoomsPage = document.querySelector(".available-rooms-page");

export const loadDashboardPage = (pastCustomerRooms, upcomingCustomerRooms) => {
  dashboardPage.classList.remove("hidden"); //will unhide the dashboard
  loginPage.classList.add("hidden"); //will hide the login page
  availableRoomsPage.classList.add("hidden"); //will hide the avail rooms page
  renderPastAndUpcomingBookingsCards(pastCustomerRooms, upcomingCustomerRooms);
};

export const loadAvailableRoomsPage = () => {
  dashboardPage.classList.add("hidden"); //will hide the dashboard page
  availableRoomsPage.classList.remove("hidden"); //will unhide avail rooms page
};

export const renderPastAndUpcomingBookingsCards = (
  pastCustomerRooms,
  upcomingCustomerRooms
) => {
  pastCustomerBookings.innerHTML = "";
  pastCustomerRooms.forEach((room) => {
    pastCustomerBookings.innerHTML +=
      //need to add card after card
      `<div class="past-booking-cards">
      <p>Room number: ${room.number} </p>
      <p>Room type: ${room.roomType} </p>
      <p>Bed type: ${room.bedSize} </p>
      <p>Number of beds: ${room.numBeds} </p>
      <p>Date: ${room.date} </p>
    </div>
    `;
  });

  upcomingCustomerBookings.innerHTML = "";
  upcomingCustomerRooms.forEach((room) => {
    upcomingCustomerBookings.innerHTML += `<div class="upcoming-booking-cards">
    <p>Room number: ${room.number} </p>
    <p>Room type: ${room.roomType} </p>
    <p>Bed type: ${room.bedSize} </p>
    <p>Number of beds: ${room.numBeds} </p>
    <p>Date: ${room.date} </p>
  </div>
    `;
  });
};

export const renderRoomTypes = (roomsData) => {
  dropDownMenu.innerHTML = "";
  const allRoomTypes = getAllRoomTypes(roomsData);
  allRoomTypes.forEach((room) => {
    dropDownMenu.innerHTML += `<option value="${room}">${room}</option>
    `;
  });
};

export const renderAvailableRooms = (availableRooms) => {
  //function is expecting an array, but if it comes back as a string, then don't run this. This was causing an error when there were no avail rooms left.
  if (typeof availableRooms !== "string") { 
    availableRoomsBox.innerHTML = "<h2>These are the available rooms!</h2> <p><em>Please choose a room of your choice!</em></p>";
    availableRooms.forEach((room) => {
      availableRoomsBox.innerHTML += `<div class="available-rooms-cards">
      <p>Room number: ${room.number} </p>
      <p>Room type: ${room.roomType} </p>
      <p>Cost per night: $${room.costPerNight}</p>
      <p>Bed Type: ${room.bedSize}</p>
      <p>Number of beds: ${room.numBeds}</p>
      <button class="bookButtons" id="${room.number}"> BOOK </button>
    </div>
      `;
    });
  }
};
