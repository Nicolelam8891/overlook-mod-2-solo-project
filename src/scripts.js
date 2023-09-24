//import datepicker from 'js-datepicker'
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { getCustomers, getBookings, getRooms } from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/sage1.png'

import { getAllCustomerBookings } from './customer-bookings';
//import { loadHomePage } from './domUpdates';
import { handleLogin } from './login';

export let customersData;
export let bookingsData;
export let roomsData;

const loginForm = document.querySelector(".login-form")
const userName = document.querySelector("#username")
const password = document.querySelector("#password")

console.log('This is the JavaScript entry file - your code begins here.');

const getAllData = () => {
  return Promise.all([getCustomers(), getBookings(), getRooms()])
  .then(data => {
    customersData = data[0].customers;
    bookingsData = data[1].bookings;
    roomsData = data[2].rooms;
  })
}
getAllData()


loginForm.addEventListener('submit', event => {
  event.preventDefault();
  handleLogin(userName.value, password.value); //need the .value in order for this to capture the text of what the customer types in
  
});



