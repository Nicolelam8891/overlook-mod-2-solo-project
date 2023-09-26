export let handleLogin = (username, password) => {
  if (username === "" || password === "") {
    return "Please enter both your username and password."
  } 
  if (username.includes("customer") && password === "overlook2021") {
    return true
  } else {
    return "Invalid credentials, please try again!";
  }
}

export const checkValidCustomerLogin = (username) => {
  let userId = username.slice(8) 
  userId = parseInt(userId)
  if (userId <= 50) { 
    return userId  
  } else {
    return `Sorry, this is not a valid ID number, please try again.`
  }
}

  
  
  
  