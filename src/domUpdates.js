import { postNewBookedRoom } from "./apiCalls";
import { getAllCustomerBookings, getAllRoomTypes } from "./customer-bookings";
import { getCustomerRoomNumbers, calculateBookingsSum } from "./calculations";

/* Calender */
const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = today.getFullYear();
const currentDate = yyyy + "-" + mm + "-" + dd;
document.querySelector('input[type="date"]').setAttribute("min", currentDate);

/* QuerySelectors here */
const loginPage = document.querySelector(".login-page");
const loginErrorMessage = document.querySelector(".login-error-message");
const dashboardPage = document.querySelector(".dashboard-page");
const dashboardButton = document.querySelector(".dashboard-button");
const pastCustomerBookings = document.querySelector("#past-customer-bookings");
const upcomingCustomerBookings = document.querySelector("#upcoming-customer-bookings");
const dropDownMenu = document.querySelector(".drop-down-menu");
const availableRoomsBox = document.querySelector(".available-rooms-box");
const availableRoomsPage = document.querySelector(".available-rooms-page");
const outerMainNav = document.querySelector(".outer-main-nav");
const totalSpentTitle = document.querySelector(".total-spent-title");
const availableTitle = document.querySelector(".available-title");
const bookingsMessage = document.querySelector(".bookings-message");

/* Functions that update the DOM here */
export const loadDashboardPage = (pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings,roomsData) => {
  dashboardPage.classList.remove("hidden"); 
  dashboardButton.classList.add("hidden");
  loginPage.classList.add("hidden"); 
  availableRoomsPage.classList.add("hidden"); 
  outerMainNav.classList.remove("hidden");
  renderPastAndUpcomingBookingsCards(pastCustomerRooms, upcomingCustomerRooms);
  displayTotalSpent(allCustomerBookings, roomsData);
};

export const loadAvailableRoomsPage = () => {
  dashboardPage.classList.add("hidden"); 
  availableRoomsPage.classList.remove("hidden"); 
  dashboardButton.classList.remove("hidden");
};

export const loginMessageError = (errorMessage1, errorMessage2) => {
  const showMessage = (errorMessage) => {
    if (typeof errorMessage === "string") {
      loginErrorMessage.classList.remove("hidden");
      loginErrorMessage.innerText = errorMessage;
    }
  };
  showMessage(errorMessage1);
  showMessage(errorMessage2);
};

export const getRoomImages = (roomType) => {
  const roomImages = {
    "single room": "single.png",
    "junior suite": "junior.png",
    "suite": "suite.png",
    "residential suite": "residential.png",
  };
  const fileName = roomImages[roomType];
  return `<img src="./images/${fileName}" alt="${roomType}" class="roomImg">`;
};

export const renderPastAndUpcomingBookingsCards = (
  pastCustomerRooms,
  upcomingCustomerRooms
) => {
  const render = (element, rooms) => {
    element.innerHTML = "";
    rooms.forEach((room) => {
      const roomImages = getRoomImages(room.roomType);
      element.innerHTML +=
        `<div class="booking-cards">
       ${roomImages}
       <p>Room number: ${room.number} </p>
       <p>Room type: ${room.roomType} </p>
       <p>Bed type: ${room.bedSize} </p>
       <p>Number of beds: ${room.numBeds} </p>
       <p>Date: ${room.date} </p>
     </div>
     `;
    });
  };

  render(pastCustomerBookings, pastCustomerRooms);
  render(upcomingCustomerBookings, upcomingCustomerRooms);
};

export const renderRoomTypes = (roomsData) => {
  dropDownMenu.innerHTML = `<option value="any">any</option>`;
  const allRoomTypes = getAllRoomTypes(roomsData);
  allRoomTypes.forEach((room) => {
    dropDownMenu.innerHTML += `<option value="${room}">${room}</option>
    `;
  });
};

export const renderAvailableRooms = (availableRooms) => {
  if (typeof availableRooms !== "string") {
    availableTitle.innerText = "These are the available rooms!";
    bookingsMessage.innerText =
      "Please select a date and room type of your choice!";
    availableRoomsBox.innerHTML = "";
    availableRooms.forEach((room) => {
      const roomImages = getRoomImages(room.roomType);
      availableRoomsBox.innerHTML += `<div class="available-rooms-cards">
      ${roomImages}
      <p>Room number: ${room.number} </p>
      <p>Room type: ${room.roomType} </p>
      <p>Cost per night: $${room.costPerNight}</p>
      <p>Bed Type: ${room.bedSize}</p>
      <p>Number of beds: ${room.numBeds}</p>
      <button class="bookButtons" id="${room.number}"> BOOK </button>
      </div>
      `;
    });
  } else {
    bookingsMessage.innerText = availableRooms;
    availableRoomsBox.innerHTML = "";
  }

  if (availableRooms.includes("Sage")) {
    availableTitle.innerText = "We're Sorry!";
  }
};

export const displayTotalSpent = (allCustomerBookings, roomsData) => {
  const roomNumbers = getCustomerRoomNumbers(allCustomerBookings);
  const totalSpent = calculateBookingsSum(roomNumbers, roomsData);
  totalSpentTitle.innerText = `Total Spent:  $ ${totalSpent}`;
};
