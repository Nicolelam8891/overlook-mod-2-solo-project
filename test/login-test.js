import chai from 'chai';
const expect = chai.expect;

import { handleLogin, checkValidCustomerLogin } from '../src/login';

describe("handle user login", function() {
  let username;
  let password;
  let result; 
  
  beforeEach(function() {
    username = "";
    password = "";
    result = undefined;
  });

  it("should be a function", function() {
    expect(handleLogin).to.be.a("function");
  });

  it("should alert when login input is empty", function() {
    result = handleLogin(username, password)
    expect(result).to.equal("Please enter both your username and password.");
  });

  it("should alert when there is a successful login ", function() {
    username = "customer50";
    password = "overlook2021";
    result = handleLogin(username, password)
    expect(result).to.equal(true);
  });

  it("should alert when there are invalid credentials", function() {
    username = "customer";
    password = "oops";
    result = handleLogin(username, password)
    expect(result).to.equal("Invalid credentials, please try again!");
  });
});

describe("should verify customer ID", function() {
  let username;
  let result; 

  beforeEach(function() {
    username = "";
    result = undefined;
  });

  it("should be a function", function() {
    expect(checkValidCustomerLogin).to.be.a("function");
  });

  it("should alert when there is a valid and invalid ID number", function() {
    username = "customer100";
    result = checkValidCustomerLogin(username)
    expect(result).to.equal("Sorry, this is not a valid ID number, please try again.");
    username = "customer50"
    result = checkValidCustomerLogin(username)
    expect(result).to.equal(50);
  });
});
