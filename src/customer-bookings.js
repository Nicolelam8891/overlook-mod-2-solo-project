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

export const getPastOrUpcomingCustomerBookings = (
  timeline,
  bookingsData,
  roomsData
) => {
  var currentDate = new Date(); //function stores the current date

  if (timeline === "past") {
    const pastBookings = bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); //convert to make it the same datatype
      return bookingDate < currentDate;
    });
    //Customer 50 should have 18 rooms. pastBookings would return an array of objects, with 13 elements, which is correct. Tried find method, it would only grab the matching room number once, and then move on, not grabbing ALL/duplicates. It would only return an array of 9 elements instead of the 13.
    //With find, being inside of the forEach method, forEach will iterate through every single element in the array, and then the find method will find the room number that matches and then since I have a pastRooms variabled declared to an empty array, I am able to push the room elements into the array with the date added as a new key, which I assigned room.date = booking.date.
    let pastRooms = [];
    pastBookings.forEach((booking) => {
      let room = roomsData.find((room) => room.number === booking.roomNumber);
      if (room) {
        room.date = booking.date; // Directly mutate the original room object, ex: date: "2022/01/23"
        pastRooms.push(room);
      }
    });
    return pastRooms;
  } else if (timeline === "upcoming") {
    const upcomingBookings = bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); //convert to make it the same datatype
      return bookingDate > currentDate;
    });

    let upcomingRooms = [];
    upcomingBookings.forEach((booking) => {
      let room = roomsData.find((room) => room.number === booking.roomNumber);
      if (room) {
        room.date = booking.date; // Directly mutate the original room object
        upcomingRooms.push(room);
      }
    });
    return upcomingRooms;
  } else {
    return "Error";
  }
};

/* new Date(): This creates a new Date object with the current date and time.
.toISOString(): Converts the date to a string in the simplified extended ISO format (ISO 8601), which looks like "2023-09-24T14:21:00.000Z".
.slice(0, 10): Extracts the first 10 characters of the string, which gives you the date portion in the format "YYYY-MM-DD".
.replace(/-/g, "/"): This replaces all occurrences of the hyphen ("-") with a forward slash ("/") */
export const getSelectedAvailableRooms = (
  dateSelected,
  roomSelected,
  bookingsData,
  roomsData
) => {
  const formattedDateSelected = dateSelected.replace(/-/g, "/");
  //Need the date() constructor to create date objects. When it is called as a function, it retuns a string representing the current time.
  //need the toISOString() to get it to the date in YYYY-MM-DD format. Need to use slice method to extract only the first 10 characters, which corresponds to just the date portion.
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  //if statements starts here first so the customer can fix the error prior to more code being executed, like in the elevator unit test.
  if (formattedDateSelected < currentDate) {
    return `You have selected a date from the past, please select a date in the future.`;
  }
  //filter: this will return an array of booking objects of all unavail dates
  //map: this will return an array of the room numbers that are unavail
  const getUnavailableDateAndRoomNumber = bookingsData
    .filter((booking) => booking.date === formattedDateSelected)
    .map((booking) => booking.roomNumber);
  //this function will return an array of objects of all the avail rooms.
  const getAvailableRooms = roomsData.filter((room) => {
    if (roomSelected === "any") {
      return !getUnavailableDateAndRoomNumber.includes(room.number); //this gives ALL avail rooms
    } 
      return !getUnavailableDateAndRoomNumber.includes(room.number) && room.roomType === roomSelected //will give rooms contingent on what customer selects
  });
  const apologyMessage =
    "Sage Serenity deeply apologizes for the inconvenience! The room type is not available on the date you selected, please adjust your search.";
  if (getAvailableRooms.length === 0) {
    //if the array is empty, return an apology!
    console.log("apologyMessage:=====", apologyMessage);
    return apologyMessage;
  } else {
    return getAvailableRooms;
  }
  //getAvailableRooms should return an array of elements of the avail rooms.
  //if there are NO elements in the array, return "Sage Serenity Hotel deeply apologizes for the inconvience. The room you selected is not available on the date you selectedm please adjust your search."
};
// console.log(getSelectedAvailableRooms("2023/02/16", "residential suite", bookingsData, roomsData))

//customer should be able to select a room for booking
//when customer clicks on the book now button,
//return the object element into an array

//get all room types for customer
//population drop-down-menu of all the different types of rooms
//console.log is working
export const getAllRoomTypes = (roomsData) => {
  const allRoomTypes = roomsData
    .map((room) => room.roomType)
    .sort((a, b) => a - b);
  const uniqueRoomTypes = [...new Set(allRoomTypes)];
  return uniqueRoomTypes;
};
