import chai from 'chai';
const expect = chai.expect;
import { bookingsData, roomsData } from './sample-data';
import { getAllCustomerBookings, getPastOrUpcomingCustomerBookings } from '../src/customer-bookings';

describe("get customer bookings", function() {
  it("should be a function", function() {
    expect(getAllCustomerBookings).to.be.a("function");
  });
  it("should return all customer bookings by specific customer ID", function() {
    let result = getAllCustomerBookings(9, bookingsData)
 
    expect(result).to.deep.equal([{
      id: "5fwrgu4i7k55hl6sz",
      userID: 9,
      date: "2022/04/22",
      roomNumber: 15,
    }]);
  });

  it("should return an error statement when ID is not found", function() {
    let result = getAllCustomerBookings(1000, bookingsData)
    expect(result).to.equal("ID not found.");
  });
});

describe("get customer booking timeline", function() {
  it("should be a function", function() {
    expect(getPastOrUpcomingCustomerBookings).to.be.a("function");
  });
  it("should return past or upcoming bookings", function() {
    let pastBookings = getPastOrUpcomingCustomerBookings("past", bookingsData)
    let upcomingBookings = getPastOrUpcomingCustomerBookings("upcoming", bookingsData)
    let error = getPastOrUpcomingCustomerBookings("oops", bookingsData)

    expect(pastBookings).to.deep.equal([{
      id: "5fwrgu4i7k55hl6sz",
      userID: 9,
      date: "2022/04/22",
      roomNumber: 15,
    },
    {
      id: "5fwrgu4i7k55hl6t5",
      userID: 43,
      date: "2022/01/24",
      roomNumber: 24,
    },
    {
      id: "5fwrgu4i7k55hl6t6",
      userID: 13,
      date: "2022/01/10",
      roomNumber: 12,
    },
    {
      id: "5fwrgu4i7k55hl6t7",
      userID: 20,
      date: "2022/02/16",
      roomNumber: 7,
    },
    {
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 12,
    }]);

    expect(upcomingBookings).to.deep.equal([{
        id: "5fwrgu4i7k55hl6t9",
        userID: 38,
        date: "2023/12/14",
        roomNumber: 14,
      }]);

      expect(error).to.equal("Error");
  });
});




