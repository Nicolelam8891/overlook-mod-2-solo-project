import chai from 'chai';
const expect = chai.expect;
import { bookingsData, roomsData } from './sample-data';
import { getAllCustomerBookings } from '../src/customer-bookings';

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





