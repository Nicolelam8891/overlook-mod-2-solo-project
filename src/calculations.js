export const calculateBookingsSum = (bookingsData) => {
  const bookingsSum = bookingsData.reduce((acc, booking) => {
    acc = acc + booking.room.costPerNight
  }, 0).toFixed(2);
}
