import { bookingsData } from "../test/sample-data";

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
    return "Error"
  }
};

//filter for a date
//customer will choose a specified date
//this will display on the DOM, input will come from the DOM
//if booking.date === dateSelected (parameter) -> return "Sorry for the inconvience, but there are no room avail for that date."
//else -> return all of the rooms that are avail for customer to choose from 
  //customer 

//
const getSelectedAvailableRooms = (dateSelected, bookingsData) => {
  const selectedAvailableRooms= bookingsData.filter(booking => booking.date === dateSelected) 
    console.log("selectedAvailableRooms:=====", selectedAvailableRooms);
    return selectedAvailableRooms
}
getSelectedAvailableRooms("2022/04/22", bookingsData)