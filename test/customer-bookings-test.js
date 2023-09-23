import chai from "chai";
const expect = chai.expect;
import { bookingsData, roomsData } from "./sample-data";
import {
  getAllCustomerBookings,
  getPastOrUpcomingCustomerBookings,
  getSelectedAvailableRooms,
} from "../src/customer-bookings";

describe("get customer bookings", function () {
  it("should be a function", function () {
    expect(getAllCustomerBookings).to.be.a("function");
  });
  it("should return all customer bookings by specific customer ID", function () {
    let result = getAllCustomerBookings(9, bookingsData);

    expect(result).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 9,
        date: "2022/04/22",
        roomNumber: 15,
      },
    ]);
  });
  it("should return an error statement when ID is not found", function () {
    let result = getAllCustomerBookings(1000, bookingsData);
    expect(result).to.equal("ID not found.");
  });
});

describe("get customer booking timeline", function () {
  it("should be a function", function () {
    expect(getPastOrUpcomingCustomerBookings).to.be.a("function");
  });
  it("should return past or upcoming bookings", function () {
    let pastBookings = getPastOrUpcomingCustomerBookings("past", bookingsData);
    let upcomingBookings = getPastOrUpcomingCustomerBookings(
      "upcoming",
      bookingsData
    );
    let error = getPastOrUpcomingCustomerBookings("oops", bookingsData);
    expect(pastBookings).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 9,
        date: "2022/04/22",
        roomNumber: 15,
      },
      {
        id: "5fwrgu4i7k55hl6t7",
        userID: 20,
        date: "2022/02/16",
        roomNumber: 7,
      },
    ]);
    expect(upcomingBookings).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t9",
        userID: 20,
        date: "2023/12/14",
        roomNumber: 14,
      },
    ]);
    expect(error).to.equal("Error");
  });
});

describe("get customer available rooms", function () {
  it("should be a function", function () {
    expect(getSelectedAvailableRooms).to.be.a("function");
  });
  it("should return all available rooms", function () {
    let availableRooms = getSelectedAvailableRooms(
      "2023/12/14",
      bookingsData,
      roomsData
    );
    expect(availableRooms).to.deep.equal([
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4,
      },
      {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46,
      },
      {
        number: 15,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46,
      }
    ]);
  });
  it("should log an error message if customer choose a past date", function () {
    let availableRooms = getSelectedAvailableRooms(
      "2022/04/22",
      bookingsData,
      roomsData
    );
    expect(availableRooms).to.equal("You have selected a date from the past, please select a date in the future.");
  });
});
