export const getCustomers = () => {
  return fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

export const getBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

export const getRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
}

