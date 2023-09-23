// const picker = datepicker(selector, options)
import { postNewBookedRoom } from "./apiCalls"
import { getAllCustomerBookings } from "./customer-bookings"

export const loadHomePage = (bookingsData) => {
  const allCustomerBookings = getAllCustomerBookings(9, bookingsData)
}

