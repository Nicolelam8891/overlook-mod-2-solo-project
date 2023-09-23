

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
