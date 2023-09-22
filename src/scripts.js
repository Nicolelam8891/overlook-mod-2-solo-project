//import datepicker from 'js-datepicker'
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

export let customersData;
export let bookingsData;
export let roomsData;

console.log('This is the JavaScript entry file - your code begins here.');

const getAllData = () => {
  Promise.all([getCustomers(), getBookings(), getRooms()])
  .then(data => {
    customersData = data[0].customers;
    bookingsData = data[1].bookings;
    roomsData = data[2].rooms;
  })
}

getAllData()

