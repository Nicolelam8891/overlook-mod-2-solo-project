import chai from 'chai';
const expect = chai.expect;

import { handleLogin, checkValidCustomerLogin } from '../src/login';

describe("handle user login", function() {
  it("should be a function", function() {
    expect(handleLogin).to.be.a("function");
  });
  it("should alert when login input is empty", function() {
    let username = "";
    let password = "";
    let result = handleLogin(username, password)
    expect(result).to.equal("Please enter both your username and password.");
  });

  it("should alert when there is a successful login ", function() {
    let username = "customer50";
    let password = "overlook2021";
    let result = handleLogin(username, password)
    expect(result).to.equal(true);
  });

  it("should alert when there are invalid credentials", function() {
    let username = "customer";
    let password = "oops";
    let result = handleLogin(username, password)
    expect(result).to.equal("Invalid credentials, please try again!");
  });
});

describe("should verify customer ID", function() {
  it("should be a function", function() {
    expect(checkValidCustomerLogin).to.be.a("function");
  });
  it("should alert when there is a valid and invalid ID number", function() {
    let username = "customer100";
    let result = checkValidCustomerLogin(username)
    expect(result).to.equal("Sorry, this is not a valid ID number, please try again.");
    username = "customer50"
    result = checkValidCustomerLogin(username)
    expect(result).to.equal(50);
  });
});
