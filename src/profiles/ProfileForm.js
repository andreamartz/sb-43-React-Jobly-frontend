/** SignupForm
 * 
 * Props: none
 * 
 * State:
 * - form data
 */

import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [form, setForm] = useState({
    username: "", 
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    const { 
      username, 
      firstName,
      lastName,
      email,
      password
    } = form;
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
            <Input 
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              bsSize="md"
            />
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
              type="text"
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