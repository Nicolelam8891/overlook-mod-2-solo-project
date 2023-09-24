//test for login information 
export let handleLogin = (username, password) => {
  if (username === "" || password === "") {
    // console.log("Please enter both your username and password.")
    return "Please enter both your username and password."
  } 

  if (username.includes("customer") && password === "overlook2021") {
    return true
  } else {
    // console.log("Invalid credentials, please try again!")
    return "Invalid credentials, please try again!";
  }
}

//checkValidCustomerLogin function gives you an id number
export const checkValidCustomerLogin = (username) => {
  const userId = username.slice(8) //take out "customer" but keeps the number, which will give me the id number "ex) 50"
  if (userId <= 50) { //hardcoded here. Another way of doing this is maping the id, which will give me an array of id numbers, then use .includes to see if the id number is there. If it is there, then the login is successful. If the id is not there, login is not successful. 
    return parseInt(userId)  // return parseInt(userId); change string into a number
  } else {
    return `Sorry, this is not a valid ID number, please try again.`
  }
}

  
  
  
  