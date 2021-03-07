/** NavBar is the top navigation bar for the site.
 * 
 * Props: none
 * 
 * State:
 * - isLoading: boolean, has data loaded yet?
 */
 import React from "react";
 import { NavLink } from "react-router-dom";
 import { Navbar, Nav, NavItem } from "reactstrap";
 import "./NavBar.css";


function NavBar() {
  return (
    <Navbar className="NavBar" expand="md">
      <NavLink exact to="/" className="NavBar-brand">
        Jobly
      </NavLink>

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
        <NavItem>
          <NavLink to="">Log out</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default NavBar;