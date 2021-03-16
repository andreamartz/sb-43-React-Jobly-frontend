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
 * - infoLoaded: boolean, has user data been pulled from API yet?
 *   > this manages the display of the loading message
 * - currentUser: user object from the API
 *   > this is how we'll know if someone is logged in
 *   > this obj is accessible throughout app via UserContext
 * - token: for logged in users, this is their authentication JWT
 *   > is required to be set for most API calls
 *   > it is initially read from localStorage
 *   > it also syncs with localStorage via the useLocalStorage hook
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import NavBar from "./routes-and-nav/NavBar";
import Routes from "./routes-and-nav/Routes";
import JoblyApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingMessage from "./common//LoadingMessage";
import UserContext from "./auth/UserContext";
import './App.css';

function App() {
  // Key name for storing token in localStorage for "remember me" re-login
  const TOKEN_STORAGE_KEY = "jobly-token";

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_KEY);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token
  );

  /** effect: loadUserInfo
   * 
   * - IF user is logged in & has a token:
   *   > loads user info from the API and updates currentUser in state OR
   *   > tries to do so and errors out, which will then update currentUser to null in state
   * 
   * - IF user has no token (i.e., is not logged in):
   *   > no user info will be retrieved and App "pages" will behave accordingly
   * 
   * - RE-RUNS at user log out
   *   - Therefore, token is a dependency for this effect
   */

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    /** getCurrentUser fcn
    * 
    * - calls the backend to get info on the new user...
    * - ...and stores the info in the currentUser state
    */ 
    async function getCurrentUser() {
      if (token) {
        try {
          // put token on API class so the class can call the API
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
    // set infoLoaded to false while async getCurrentUser runs
    // once the getCurrentUser finishes (regardless of success of data fetch), this will be set back to true to control the loading message.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** fcn signup 
   * - Handles site-wide signup
   * - registers a new user
   * - automatically logs in new user (setToken) after registration
   * - is passed to SignupForm as a prop
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

  /** fcn login
   * 
   * - Handles site-wide login (setToken)
   * - is passed to LoginForm as a prop
   */

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

  /** fcn logout
   * Handles site-wide log out 
  */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** fcn hasAppliedToJob
   * Checks if a job has been applied for
   */

  /** fcn applyToJob
   * - Apply to a job by calling API
   * - update set of applicaiton IDs
   */

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
