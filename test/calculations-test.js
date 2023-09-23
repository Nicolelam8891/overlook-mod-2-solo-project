import { calculateBookingsSum } from "../src/calculations";
import { bookingsData } from "./sample-data";
import { getAllCustomerBookings } from "../src/customer-bookings";
import { getCustomerRoomNumbers } from "../src/calculations";

import chai from "chai";
const expect = chai.expect;

describe("get customer room numbers", function () {
  it("should be a function", function () {
    expect(getCustomerRoomNumbers).to.be.a("function");
  });

  it("should get customer room numbers", function () {
    const allCustomerBookings = getAllCustomerBookings(20, bookingsData);
    const customerRoomNumbers = getCustomerRoomNumbers(allCustomerBookings);

    expect(customerRoomNumbers).to.deep.equal([7]);
  });
});

describe("calculate customer bookings", function () {
  it.skip("should be a function", function () {
    expect(calculateBookingsSum).to.be.a("function");
  });

  it.skip("should calculate the total spent on all bookings for the customer", function () {
    const customerBookings = getAllCustomerBookings(20, bookingsData);
    let result = calculateBookingsSum(userBookings);
    expect(result).to.be.a(231.46);
  });
});

// let userBookings = getAllCustomerBookings(50, bookingsData)
// calculateBookingsSum(userBookings)
