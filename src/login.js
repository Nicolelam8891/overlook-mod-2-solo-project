//test for login information 

let username = "customer50"
let password = "overlook2021"

export let handleLogin = (username, password) => {
  const userId = username.slice(8)

  if (username === "" || password === "") {
    return "Please enter both your username and password."
  }

  if (username.includes("customer") && password === "overlook2021") {
    return "Login successful!"
    // return parseInt(userId); //change string into a number
  } else {
    return "Invalid credentials, please try again!";
  }
}

  
  
  
  