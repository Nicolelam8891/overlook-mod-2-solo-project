import chai from "chai";
const expect = chai.expect;
import { bookingsData, roomsData } from "./sample-data";
import {
  getAllCustomerBookings,
  getPastOrUpcomingCustomerBookings,
  getSelectedAvailableRooms,
  getAllRoomTypes,
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
    let pastBookings = getPastOrUpcomingCustomerBookings(
      "past",
      bookingsData,
      roomsData
    );
    let upcomingBookings = getPastOrUpcomingCustomerBookings(
      "upcoming",
      bookingsData,
      roomsData
    );
    console.log("upcomingBookings:=====", upcomingBookings);
    let error = getPastOrUpcomingCustomerBookings(
      "oops",
      bookingsData,
      roomsData
    );
    expect(pastBookings).to.deep.equal([
      {
        number: 15,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46,
        date: "2022/04/22",
      },
      {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46,
        date: "2022/02/16",
      },
    ]);
    expect(upcomingBookings).to.deep.equal([
      {
        number: 14,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38,
        date: "2023/12/14",
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
      "residential suite",
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
    ]);
  });
  it("should log an error message if customer choose a past date", function () {
    let availableRooms = getSelectedAvailableRooms(
      "2022/04/22",
      "residential suite",
      bookingsData,
      roomsData
    );
    expect(availableRooms).to.equal("Please select a date.");
  });
 
});

describe("should get only unqiue room types", function () {
  it("should be a function", function () {
    expect(getAllRoomTypes).to.be.a("function");
  });
  it("should return room types without any duplicates", function () {
    const uniqueRoomTypes = getAllRoomTypes(roomsData);
    expect(uniqueRoomTypes).to.deep.equal([
      "residential suite",
      "suite",
      "single room",
    ]);
  });
});
