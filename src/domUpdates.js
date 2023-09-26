import { postNewBookedRoom } from "./apiCalls";
import { getAllCustomerBookings, getAllRoomTypes } from "./customer-bookings";
import { getCustomerRoomNumbers, calculateBookingsSum } from "./calculations";

// Get today's date, prevent customer handle error
const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
const yyyy = today.getFullYear();

const currentDate = yyyy + "-" + mm + "-" + dd;

// Set the min attribute for the input element
document.querySelector('input[type="date"]').setAttribute("min", currentDate);

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
const outerMainNav = document.querySelector(".outer-main-nav");
const totalSpentTitle = document.querySelector(".total-spent-title");
const loginErrorMessage = document.querySelector(".login-error-message");
const bookingsMessage = document.querySelector(".bookings-message");

export const loadDashboardPage = (
  pastCustomerRooms,
  upcomingCustomerRooms,
  allCustomerBookings,
  roomsData
) => {
  dashboardPage.classList.remove("hidden"); //will unhide the dashboard
  loginPage.classList.add("hidden"); //will hide the login page
  availableRoomsPage.classList.add("hidden"); //will hide the avail rooms page
  outerMainNav.classList.remove("hidden");
  renderPastAndUpcomingBookingsCards(pastCustomerRooms, upcomingCustomerRooms);
  displayTotalSpent(allCustomerBookings, roomsData);
};

export const loadAvailableRoomsPage = () => {
  dashboardPage.classList.add("hidden"); //will hide the dashboard page
  availableRoomsPage.classList.remove("hidden"); //will unhide avail rooms page
};

//
export const loginMessageError = (errorMessage1, errorMessage2) => {
  //creating another function inside of the loginMessageError
  const showMessage = (errorMessage) => {
    //takes in an argument
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
    "residential suite": "residential.png"
  };
  const fileName = roomImages[roomType];
  return `<img src="./images/${fileName}" alt="${roomType}" class="roomImg">`;
};

export const renderPastAndUpcomingBookingsCards = (
  pastCustomerRooms,
  upcomingCustomerRooms
) => {
  pastCustomerBookings.innerHTML = "";
  pastCustomerRooms.forEach((room) => {
    const roomImages = getRoomImages(room.roomType);
    pastCustomerBookings.innerHTML +=
      //need to add card after card
      `<div class="past-booking-cards">
      ${roomImages}
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
    const roomImages = getRoomImages(room.roomType);
    upcomingCustomerBookings.innerHTML += `<div class="upcoming-booking-cards">
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

export const renderRoomTypes = (roomsData) => {
  dropDownMenu.innerHTML = `<option value="any">any</option>`;
  const allRoomTypes = getAllRoomTypes(roomsData);
  allRoomTypes.forEach((room) => {
    dropDownMenu.innerHTML += `<option value="${room}">${room}</option>
    `;
  });
};

export const renderAvailableRooms = (availableRooms) => {
  //function is expecting an array, but if it comes back as a string, then don't run this. This was causing an error when there were no avail rooms left.

  if (typeof availableRooms !== "string") {
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
  }
};

export const displayTotalSpent = (allCustomerBookings, roomsData) => {
  const roomNumbers = getCustomerRoomNumbers(allCustomerBookings);
  const totalSpent = calculateBookingsSum(roomNumbers, roomsData);
  totalSpentTitle.innerText = `Total Spent:  $ ${totalSpent}`;
};
