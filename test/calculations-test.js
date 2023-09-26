import { calculateBookingsSum } from "../src/calculations";
import { bookingsData, roomsData } from "./sample-data";
import { getAllCustomerBookings } from "../src/customer-bookings";
import { getCustomerRoomNumbers } from "../src/calculations";

import chai from "chai";
const expect = chai.expect;

describe("get customer room numbers", function () {
  let allCustomerBookings;
  let customerRoomNumbers;
  
  beforeEach(function() {
    allCustomerBookings = getAllCustomerBookings(20, bookingsData);
    customerRoomNumbers = getCustomerRoomNumbers(allCustomerBookings);
  });

  it("should be a function", function () {
    expect(getCustomerRoomNumbers).to.be.a("function");
  });

  it("should get customer room numbers", function () {
    allCustomerBookings = getAllCustomerBookings(20, bookingsData);
    customerRoomNumbers = getCustomerRoomNumbers(allCustomerBookings);
    expect(customerRoomNumbers).to.deep.equal([7, 14]);
  });
});

describe("calculate customer bookings", function () {
  let allCustomerBookings;
  let customerRoomNumbers;
  let sum;

  beforeEach(function() {
    allCustomerBookings = getAllCustomerBookings(20, bookingsData);
    customerRoomNumbers = getCustomerRoomNumbers(allCustomerBookings);
    sum = calculateBookingsSum(customerRoomNumbers, roomsData);
  });

  it("should be a function", function () {
    expect(calculateBookingsSum).to.be.a("function");
  });

  it("should calculate the total spent on all bookings for the customer", function () {
    allCustomerBookings = getAllCustomerBookings(20, bookingsData);
    customerRoomNumbers = getCustomerRoomNumbers(allCustomerBookings);
    sum = calculateBookingsSum(customerRoomNumbers, roomsData);
    expect(sum).to.equal("708.84");
  });
});

