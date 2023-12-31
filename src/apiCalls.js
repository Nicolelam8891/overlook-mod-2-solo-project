export const getCustomers = () => {
  return fetch("https://overlook-api-1.vercel.app/api/v1/customers")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

export const getBookings = () => {
  return fetch("https://overlook-api-1.vercel.app/api/v1/bookings")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

export const getRooms = () => {
  return fetch("https://overlook-api-1.vercel.app/api/v1/rooms")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

export const postNewBookedRoom = (userID, dateSelected, roomNumber) => {
  const postNewBooking = { "userID": userID , "date": dateSelected, "roomNumber": roomNumber}; 

  return (
    fetch("https://overlook-api-1.vercel.app/api/v1/bookings", {
      method: "POST",
      body: JSON.stringify(postNewBooking),
      headers: {
        "Content-Type": 'application/json', 
      }
    })
      .then(response => response.json())
      .catch(error => console.log(error)) 
  );
};
