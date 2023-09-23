import { getAllCustomerBookings } from "./customer-bookings";

//allCustomerBookings is an array of object elements
export const getCustomerRoomNumbers = (allCustomerBookings) => {
  const customerRoomNumbers = allCustomerBookings.map(booking => booking.roomNumber)
  return customerRoomNumbers
}

export const calculateBookingsSum = (roomNumbers, roomsData) => {
  return roomNumbers.reduce((acc, roomNumber) => {
    const room = roomsData.find(room => room.number === roomNumber)
    if (room) {
      acc = acc + room.costPerNight
    } else {
      return acc
    }
  }, 0) 
}

