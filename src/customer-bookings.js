export const getAllCustomerBookings = (customerID, bookingsData) => {
  const allCustomerBookings = bookingsData.filter(
    (booking) => booking.userID === customerID
  ); 
  if (allCustomerBookings.length === 0) {
    return `ID not found.`;
  }
  return allCustomerBookings;
};

export const getPastOrUpcomingCustomerBookings = (timeline, bookingsData,roomsData) => {
  var currentDate = new Date(); 
  if (timeline === "past") {
    const pastBookings = bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); 
      return bookingDate < currentDate;
    });
    
    let pastRooms = [];
    pastBookings.forEach((booking) => {
      let room = roomsData.find((room) => room.number === booking.roomNumber);
      if (room) {
        room.date = booking.date; 
        pastRooms.push(room);
      }
    });
    return pastRooms;
  } else if (timeline === "upcoming") {
    const upcomingBookings = bookingsData.filter((booking) => {
      const bookingDate = new Date(booking.date); 
      return bookingDate > currentDate;
    });

    let upcomingRooms = [];
    upcomingBookings.forEach((booking) => {
      let room = roomsData.find((room) => room.number === booking.roomNumber);
      if (room) {
        room.date = booking.date; 
        upcomingRooms.push(room);
      }
    });
    return upcomingRooms;
  } else {
    return "Error";
  }
};

export const getSelectedAvailableRooms = (dateSelected, roomSelected, bookingsData, roomsData) => {
  const formattedDateSelected = dateSelected.replace(/-/g, "/");
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  if (formattedDateSelected < currentDate) {
    return `Please select a date.`;
  }
  const getUnavailableDateAndRoomNumber = bookingsData
    .filter((booking) => booking.date === formattedDateSelected)
    .map((booking) => booking.roomNumber);
  const getAvailableRooms = roomsData.filter((room) => {
    if (roomSelected === "any") {
      return !getUnavailableDateAndRoomNumber.includes(room.number); 
    } 
      return !getUnavailableDateAndRoomNumber.includes(room.number) && room.roomType === roomSelected 
  });
  const apologyMessage =
    "Sage Serenity deeply apologizes for the inconvenience! The room type is not available on the date you selected, please adjust your search.";
  if (getAvailableRooms.length === 0) {
    return apologyMessage;
  } else {
    return getAvailableRooms;
  }
};

export const getAllRoomTypes = (roomsData) => {
  const allRoomTypes = roomsData
    .map((room) => room.roomType)
    .sort((a, b) => a - b);
  const uniqueRoomTypes = [...new Set(allRoomTypes)];
  return uniqueRoomTypes;
};
