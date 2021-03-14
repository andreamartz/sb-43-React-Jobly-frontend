/** Jobly frontend main app 
 * 
 * Props: none
 * 
 * State:
 * - isLoading: boolean, has data loaded yet?
 */

import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-and-nav/NavBar";
import Routes from "./routes-and-nav/Routes";
import UserContext from "./auth/UserContext";
import './App.css';

function App() {
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

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main className="App-main">
          <Routes />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
