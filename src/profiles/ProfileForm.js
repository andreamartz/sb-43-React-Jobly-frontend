/** ProfileForm
 * 
 * Purpose: 
 * - display form where user can edit profile info (first name, last name, and email)
 * - form submission calls the API to save and triggers user reloading throughout the site
 * 
 * Props: none
 * 
 * State:
 * - form data
 * 
 * Routing path /profile
 * Routes -> ProfileForm -> Alert
 */

import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import UserContext from "../auth/UserContext";
import "./ProfileForm.css";

const ProfileForm = ({ update }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [form, setForm] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "ProfileForm",
    "currentUser=", currentUser,
    "formData=", form,
    "formErrors=", formErrors
);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  /** on form submit:
   * - attempt to save to backend & report any errors
   * - if successful:
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    const { username } = form;
    const { 
      firstName,
      lastName,
      email,
      password
    } = form;

    const userData = {firstName, lastName, email, password};

    const res = await update(username, userData);

    if (res.success) {
      setForm(f => ({ ...f, password: "" }));
      setFormErrors([]);

      // trigger reloading of user information throughout the site
      setCurrentUser(res.user);
    } else {
      setFormErrors(res.errors);
      return;
    }
  }

  return (
    <div className="ProfileForm">
      <h1>Profile</h1>
      <div className="ProfileForm-FormContainer">
        <Form
          className="ProfileForm-Form"
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label>
              Username
            </Label>
            <p>{ currentUser.username }</p>
          </FormGroup>
          <FormGroup>
            <Label>
              First name
            </Label>
            <Input 
              type="text"
              name="firstName"
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              bsSize="md"
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Last name
            </Label>
            <Input 
              type="text"
              name="lastName"
              id="lastName"
              value={form.lastName}
              onChange={handleChange}
              bsSize="md"
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Email
            </Label>
            <Input 
              type="text"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              bsSize="md"
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Confirm password to make changes:
            </Label>
            <Input 
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              bsSize="md"
            />
          </FormGroup>
          <div className="ProfileForm-SubmitButton">
            <Button 
              type="submit" 
              color="primary"
              size="md"
              block
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ProfileForm;