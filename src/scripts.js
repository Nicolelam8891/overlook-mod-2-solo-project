//import datepicker from 'js-datepicker'
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import {
  getCustomers,
  getBookings,
  getRooms,
  postNewBookedRoom,
} from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/sage1.png";

import {
  getAllCustomerBookings,
  getPastOrUpcomingCustomerBookings,
  getAllRoomTypes,
  getSelectedAvailableRooms,
} from "./customer-bookings";
//import { loadHomePage } from './domUpdates';
import { handleLogin, checkValidCustomerLogin } from "./login";
import {
  loadDashboardPage,
  renderRoomTypes,
  renderAvailableRooms,
  loadAvailableRoomsPage,
} from "./domUpdates";

let customersData;
let bookingsData;
let roomsData;
let customerIdNumber;
let allCustomerBookings;
let pastCustomerRooms;
let upcomingCustomerRooms;

const loginForm = document.querySelector(".login-form");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const modal = document.querySelector("#myModal");
const findRoomButton = document.querySelector(".find-rooms-button"); //this is the button that opens the modal
const span = document.querySelector(".close"); //this is the <span> element that closes the modal. When you click on the x button, it will exit
const findRoomForm = document.querySelector(".find-room-form");
const date = document.querySelector(".date-input");
const roomType = document.querySelector(".drop-down-menu");
const availableRoomsBox = document.querySelector(".available-rooms-box");

const getAllData = () => {
  return Promise.all([getCustomers(), getBookings(), getRooms()]).then(
    (data) => {
      customersData = data[0].customers;
      bookingsData = data[1].bookings;
      roomsData = data[2].rooms;
    }
  );
};

getAllData().then(() => {
  findRoomButton.onclick = function () {
    modal.style.display = "block";
    renderRoomTypes(roomsData);
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  findRoomForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const availableRooms = getSelectedAvailableRooms(
      date.value,
      roomType.value,
      bookingsData,
      roomsData
    ); //remember to do .value or it won't work! It will go back to where it's being inputed in HTML
    modal.style.display = "none";
    renderAvailableRooms(availableRooms);
    loadAvailableRoomsPage(); //when you click the find room button, it will hide the dashboard
  });

  availableRoomsBox.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("bookButtons")) {
      const card = event.target.closest(".available-rooms-cards");
      const roomNumberElement = card.querySelector("p[id]"); //gives me the element
      const roomId = parseInt(roomNumberElement.id)
      let newdate = date.value
      newdate = newdate.replace(/-/g, '/');
      postNewBookedRoom(customerIdNumber, newdate, roomId);
      
    }
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    customerIdNumber = checkValidCustomerLogin(userName.value);
    // console.log("customerIdNumber:=====", customerIdNumber);
    const successfulLogin = handleLogin(userName.value, password.value); //need the .value in order for this to capture the text of what the customer types in
    // console.log("successfulLogin:=====", successfulLogin);
    if (successfulLogin === true && Number.isInteger(customerIdNumber)) {
      //isInteger will check if value pass is an integer or not.
      //when these two are met, then the loadHomePage function will occur; otherwise, it will not.
      allCustomerBookings = getAllCustomerBookings(
        customerIdNumber,
        bookingsData
      );
      pastCustomerRooms = getPastOrUpcomingCustomerBookings(
        "past",
        allCustomerBookings,
        roomsData
      );
      upcomingCustomerRooms = getPastOrUpcomingCustomerBookings(
        "upcoming",
        allCustomerBookings,
        roomsData
      );
      loadDashboardPage(pastCustomerRooms, upcomingCustomerRooms);
    }
  });
});
