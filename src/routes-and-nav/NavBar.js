/** NavBar is the top navigation bar for the site.
 * 
 * Props: none
 * 
 * State:
 * - isLoading: boolean, has data loaded yet?
 */
 import React, { useContext } from "react";
 import { NavLink } from "react-router-dom";
 import { Navbar, Nav, NavItem } from "reactstrap";
 import UserContext from "../auth/UserContext";
 import "./NavBar.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation: ", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <Nav className="NavBar-links" navbar>
        <NavItem>
          <NavLink to="/companies">Companies</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/jobs">Jobs</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile">Profile</NavLink>
        </NavItem>
        <NavItem className="NavBar-logout">
          <NavLink to="/" onClick={logout}>
            {/* {`Log out ${currentUser.username}`} */}
            {`Log Out ${currentUser.username}`}
          </NavLink>
        </NavItem>
      </Nav>
    )
  }
  function loggedOutNav() {
    return (
      <Nav className="NavBar-links" navbar>
        <NavItem className="NavBar-login">
          <NavLink to="/login">
            Login
          </NavLink>
        </NavItem>
        <NavItem className="NavBar-signup">
          <NavLink to="/signup">
            Sign up
          </NavLink>
        </NavItem>
      </Nav>
    )
  }

  return (
    <Navbar className="NavBar" expand="md">
      <NavLink exact to="/" className="NavBar-brand">
        Jobly
      </NavLink>
      {currentUser
      ? loggedInNav()
      : loggedOutNav()
      }
    </Navbar>
  )
}

export default NavBar;