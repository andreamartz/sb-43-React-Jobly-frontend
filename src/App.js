/** Jobly frontend main app 
 * 
 * Purposes:
 * - top-level home for the app
 * - hold token in state (so that a user context can provide it to other components)
 * - re-render the app when token state changes
 * - hold the fcns related to auth (i.e., signup, login, logout)
 * 
 * 
 * Props: none
 * 
 * State:
 * - isLoading: boolean, has data loaded yet?
 * - token for logged in user
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import NavBar from "./routes-and-nav/NavBar";
import Routes from "./routes-and-nav/Routes";
import JoblyApi from "./api";
import LoadingMessage from "./common//LoadingMessage";
import UserContext from "./auth/UserContext";
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  // console.debug(
  //   "App",
  //   "infoLoaded=", infoLoaded,
  //   "currentUser=", currentUser,
  //   "token=", token
  // );

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);
    /** Define and call fcn getCurrentUser
    * - this fcn calls the backend to get info on the new user...
    * - ...and store the info in the currentUser state
    */ 
    async function getCurrentUser() {
      if (token) {
        try {
          // put token on API class so that the class can use it to call the API
          JoblyApi.token = token;
  
          const { username } = jwt.decode(token);
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Problem in loading user info (see App loadUserInfo", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    getCurrentUser();
  }, [token]);

  /** Sign up a new user
   *  - registers a new user
   *  - puts the user's token in state
   */
  async function signup(username, password, firstName, lastName, email) {
    try {
      const token = await JoblyApi.signup(username, password, firstName, lastName, email);
      console.log("TOKEN from App: ", token);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("Signup failed. Errors: ", err);
      return { success: false, err };
    }
  }

  async function login(username, password) {
    try {
      const token = await JoblyApi.login(username, password);
      setToken(token);
      return { success: true };
    } catch(err) {
      console.error("Login failed. Errors: ", err);
      return { success: false, err };
    }
  }

  /** Log a user out */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <LoadingMessage />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <NavBar logout={ logout }/>
          <main className="App-main">
            <Routes login={ login } signup={ signup }/>
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
