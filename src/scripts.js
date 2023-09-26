import "./css/styles.css";
import { getCustomers, getBookings, getRooms, postNewBookedRoom } from "./apiCalls";
import { getAllCustomerBookings, getPastOrUpcomingCustomerBookings, getSelectedAvailableRooms } from "./customer-bookings";
import { handleLogin, checkValidCustomerLogin } from "./login";
import { loadDashboardPage, renderRoomTypes, renderAvailableRooms, loadAvailableRoomsPage,loginMessageError } from "./domUpdates";
import "./images/sage1.png";
import "./images/single.png";
import "./images/junior.png";
import "./images/suite.png";
import "./images/residential.png";

/* Global Variables */ 
let customersData;
let bookingsData;
let roomsData;
let customerIdNumber;
let allCustomerBookings;
let pastCustomerRooms;
let upcomingCustomerRooms;

/* QuerySelectors here */
const loginForm = document.querySelector(".login-form");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const findRoomButton = document.querySelector(".find-rooms-button"); 
const findRoomsModal = document.querySelector("#findRoomsModal");
const closeButtons = document.querySelectorAll(".close"); 
const successfulBookingModal = document.querySelector("#successfulBookingModal");
const dashboardButton = document.querySelector(".dashboard-button")
const findRoomForm = document.querySelector(".find-room-form");
const date = document.querySelector(".date-input");
const roomType = document.querySelector(".drop-down-menu");
const availableRoomsBox = document.querySelector(".available-rooms-box");
const successButton = document.querySelector(".success-button");

/* Functions here */
const getAllData = () => {
  return Promise.all([getCustomers(), getBookings(), getRooms()]).then(
    (data) => {
      customersData = data[0].customers;
      bookingsData = data[1].bookings;
      roomsData = data[2].rooms;
    }
  );
};

const updateCustomerData = () => {
  allCustomerBookings = getAllCustomerBookings(customerIdNumber,bookingsData);
  pastCustomerRooms = getPastOrUpcomingCustomerBookings("past",allCustomerBookings,roomsData);
  upcomingCustomerRooms = getPastOrUpcomingCustomerBookings("upcoming",allCustomerBookings,roomsData);
}

/* EventListeners here */
window.addEventListener("load", getAllData);

dashboardButton.onclick = function () {
  loadDashboardPage(pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings, roomsData);
}

findRoomButton.onclick = function () {
  findRoomsModal.style.display = "block";
  renderRoomTypes(roomsData);
};

closeButtons.forEach(function (span) {
  span.addEventListener("click", function () {
    findRoomsModal.style.display = "none";
    successfulBookingModal.style.display = "none";
  });
});

window.onclick = function (event) {
  if (
    event.target == findRoomsModal ||
    event.target == successfulBookingModal
  ) {
    findRoomsModal.style.display = "none";
    successfulBookingModal.style.display = "none";
  }
};

findRoomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const availableRooms = getSelectedAvailableRooms(
    date.value,
    roomType.value,
    bookingsData,
    roomsData
  ); 
 
  findRoomsModal.style.display = "none";
  renderAvailableRooms(availableRooms);
  loadAvailableRoomsPage(); 
});

availableRoomsBox.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("bookButtons")) {
    const roomId = parseInt(event.target.id);
    let formattedDate = date.value.replace(/-/g, "/");
    postNewBookedRoom(customerIdNumber, formattedDate, roomId)
      .then(() => getAllData()) 
      .then(() => {
        successfulBookingModal.style.display = "block"; 
      });
  }
});

successButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateCustomerData();
  loadDashboardPage(pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings, roomsData);
  successfulBookingModal.style.display = "none";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  customerIdNumber = checkValidCustomerLogin(userName.value);
  const successfulLogin = handleLogin(userName.value, password.value); 
  loginMessageError(customerIdNumber, successfulLogin)

  if (successfulLogin === true && Number.isInteger(customerIdNumber)) {
    updateCustomerData();
    loadDashboardPage(pastCustomerRooms, upcomingCustomerRooms, allCustomerBookings, roomsData);
  }
});

