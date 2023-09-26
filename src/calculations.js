export const getCustomerRoomNumbers = (allCustomerBookings) => {
  const customerRoomNumbers = allCustomerBookings.map(booking => booking.roomNumber)
  return customerRoomNumbers
}

export const calculateBookingsSum = (roomNumbers, roomsData) => {
  const total = roomNumbers.reduce((acc, roomNumber) => {
    const room = roomsData.find(room => room.number === roomNumber)
    if (room) {
      return acc = acc + room.costPerNight
    } 
  }, 0) 
  return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
}

