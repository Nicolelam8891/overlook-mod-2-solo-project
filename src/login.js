//test for login information 
import { loadHomePage } from "./domUpdates"



export let handleLogin = (username, password) => {
  const userId = username.slice(8)

  if (username === "" || password === "") {
    // console.log("Please enter both your username and password.")
    return "Please enter both your username and password."
  }

  if (username.includes("customer") && password === "overlook2021") {
    loadHomePage()
    
    return parseInt(userId)
    // return parseInt(userId); change string into a number
  } else {
    // console.log("Invalid credentials, please try again!")
    return "Invalid credentials, please try again!";
  }
}

  
  
  
  