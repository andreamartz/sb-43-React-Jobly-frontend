/** SignupForm
 * 
 * Props: none
 * 
 * State:
 * - form data
 */

import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./SignupForm.css";

const SignupForm = ({ signup }) => {
  const [form, setForm] = useState({
    username: "", 
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    const { 
      username, 
      password, 
      firstName,
      lastName,
      email
    } = form;
    const token = await signup(
      username, 
      password,
      firstName,
      lastName,
      email
    );

  }

  return (
    <div className="SignupForm">
      <h1>Sign Up</h1>
      <div className="SignupForm-FormContainer">
        <Form
          className="SignupForm-Form"
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
              Password
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
          <div className="SignupForm-SubmitButton">
            <Button 
              type="submit" 
              color="primary"
              size="md"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignupForm;