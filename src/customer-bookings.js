import { bookingsData, roomsData } from "../test/sample-data";

export const getAllCustomerBookings = (customerID, bookingsData) => {
  //taking in the two parameters. bookingsData has the array of booking objects, and each booking has a property 'userID' that associates it with a particular customer.
  const allCustomerBookings = bookingsData.filter(
    (booking) => booking.userID === customerID
  ); //filter through the entire array of bookings with built-in conditional. If booking.userID matches customerID, return.

  if (allCustomerBookings.length === 0) {
    //if the allCustomerBookings array is empty because the customer inputs the wrong information, the length will be 0, there are no bookings for the provided customerID.
    return `ID not found.`;
  }
  return allCustomerBookings;
};

export const getPastOrUpcomingCustomerBookings = (timeline, bookingsData) => {
  var currentDate = new Date(); //function stores the current date

  if (timeline === "past") {
    return bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); //convert to make it the same datatype
      return bookingDate < currentDate;
    });
  } else if (timeline === "upcoming") {
    return bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); //convert to make it the same datatype
      return bookingDate > currentDate;
    });
  } else {
    return "Error";
  }
};

export const getSelectedAvailableRooms = (dateSelected, roomSelected, bookingsData, roomsData) => {
  //Need the date() constructor to create date objects. When it is called as a function, it retuns a string representing the current time. 
  //need the toISOString() to get it to the date in YYYY-MM-DD format. Need to use slice method to extract only the first 10 characters, which corresponds to just the date portion. 
  const currentDate = new Date().toISOString().slice(0, 10);
  //if statements starts here first so the customer can fix the error prior to more code being executed, like in the elevator unit test. 
  if (dateSelected  < currentDate) {
    return `You have selected a date from the past, please select a date in the future.`
  }
  //filter: this will return an array of booking objects of all unavail dates
  //map: this will return an array of the room numbers that are unavail
  const getUnavailableDateAndRoomNumber = bookingsData
    .filter((booking) => booking.date === dateSelected)
    .map((booking) => booking.roomNumber);
  //this function will return an array of objects of all the avail rooms.
  const getAvailableRooms = roomsData.filter(room => 
    !getUnavailableDateAndRoomNumber.includes(room.number) && room.roomType === roomSelected
  );
  if (getAvailableRooms.length === 0) { //if the array is empty, return an apology!
    return "Sage Serenity Hotel deeply apologizes for the inconvenience. The room type is not available on the date you selected, please adjust your search."
  } else {
    return getAvailableRooms;
  } 
//getAvailableRooms should return an array of elements of the avail rooms. 
//if there are NO elements in the array, return "Sage Serenity Hotel deeply apologizes for the inconvience. The room you selected is not available on the date you selectedm please adjust your search."
};
console.log(getSelectedAvailableRooms("2023/02/16", "residential suite", bookingsData, roomsData))

//customer should be able to select a room for booking 
//when customer clicks on the book now button, 
  //return the object element into an array

//get all room types for customer
//population drop-down-menu of all the different types of rooms
//console.log is working 
export const getAllRoomTypes = (roomsData) => {
  const allRoomTypes = roomsData
    .map(room => room.roomType) 
    .sort((a, b) => a - b)
    const uniqueRoomTypes = [...new Set(allRoomTypes)]
    return uniqueRoomTypes
} 

getAllRoomTypes(roomsData)
