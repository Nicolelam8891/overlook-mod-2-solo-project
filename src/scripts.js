//import datepicker from 'js-datepicker'
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import { getCustomers, getBookings, getRooms } from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/sage1.png";

import {
  getAllCustomerBookings,
  getPastOrUpcomingCustomerBookings,
} from "./customer-bookings";
//import { loadHomePage } from './domUpdates';
import { handleLogin, checkValidCustomerLogin } from "./login";
import { loadDashboardPage } from "./domUpdates";

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
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    customerIdNumber = checkValidCustomerLogin(userName.value);
    // console.log("customerIdNumber:=====", customerIdNumber);
    const successfulLogin = handleLogin(userName.value, password.value); //need the .value in order for this to capture the text of what the customer types in
    // console.log("successfulLogin:=====", successfulLogin);
    if (successfulLogin === true && Number.isInteger(customerIdNumber)) {
      //isInteger will check if value pass is an integer or not.
      //when these two are met, then the loadHomePage function will occur; otherwise, it will not.
      allCustomerBookings = getAllCustomerBookings(customerIdNumber,bookingsData);
      pastCustomerRooms = getPastOrUpcomingCustomerBookings("past", allCustomerBookings, roomsData);
      upcomingCustomerRooms = getPastOrUpcomingCustomerBookings("upcoming", allCustomerBookings, roomsData);
      console.log("upcomingCustomerRooms:=====", upcomingCustomerRooms);

      loadDashboardPage(pastCustomerRooms, upcomingCustomerRooms);
    }
  });
});
