/** HomePage
 * 
 *  Purpose: 
 *  - show welcome message
 *  - message should include name of logged in user (if one exists)
 * 
 *  Props: none
 * 
 *  State: 
 * 
 */
import React, { useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./HomePage.css";

function HomePage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="HomePage">
      <div>
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {/* Logged in user? Show username
        Otherwise, show login and signup buttons */}
        {currentUser
          ? <h2>Welcome Back, {`${currentUser.firstName}`}</h2>
          : <p>
              <Link to="/login">
                <Button color="primary" className="HomePage-Button">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button color="primary" className="HomePage-Button">Sign up</Button>
              </Link>
            </p>
        }
      </div>
    </div>
  )
}

export default HomePage;