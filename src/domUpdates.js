import { postNewBookedRoom } from "./apiCalls";
import { getAllCustomerBookings, getAllRoomTypes } from "./customer-bookings";

/* QuerySelectors here */
const loginPage = document.querySelector(".login-page");
const dashboardPage = document.querySelector(".dashboard-page");
const pastCustomerBookings = document.querySelector("#past-customer-bookings");
const futureCustomerBookings = document.querySelector(
  "#future-customer-bookings"
);
const dropDownMenu = document.querySelector(".drop-down-menu");
const availableRoomsBox = document.querySelector(".available-rooms-box");

export const loadDashboardPage = (pastCustomerRooms, upcomingCustomerRooms) => {
  dashboardPage.classList.remove("hidden");
  loginPage.classList.add("hidden");
  renderPastAndUpcomingBookingsCards(pastCustomerRooms, upcomingCustomerRooms);
};

export const renderPastAndUpcomingBookingsCards = (
  pastCustomerRooms,
  upcomingCustomerRooms
) => {
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

  upcomingCustomerRooms.forEach((room) => {
    futureCustomerBookings.innerHTML += `<div class="future-booking-cards">
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
  const allRoomTypes = getAllRoomTypes(roomsData);
  allRoomTypes.forEach((room) => {
    dropDownMenu.innerHTML += `<option value="${room}">${room}</option>
    `;
  });
};

export const renderAvailableRooms = (availableRooms) => {
  let id = 0;
  availableRooms.forEach((room) => {
    availableRoomsBox.innerHTML += `<div class="available-rooms-cards">
    <p id="${room.number}">Room number: ${room.number} </p>
    <p>Room type: ${room.roomType} </p>
    <p>Cost per night: ${room.costPerNight}</p>
    <p>Bed Type: ${room.bedSize}</p>
    <p>Number of beds: ${room.numBeds}</p>
    <button class="bookButtons"> BOOK </button>
  </div>
    `;
    id++;
  });
};
