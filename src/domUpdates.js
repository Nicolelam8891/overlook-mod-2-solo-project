// const picker = datepicker(selector, options)
import { getAllCustomerBookings } from "./customer-bookings"
export const loadHomePage = (bookingsData) => {
const allCustomerBookings = getAllCustomerBookings(9, bookingsData)
}