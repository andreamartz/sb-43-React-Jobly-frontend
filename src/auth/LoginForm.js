/** LoginForm
 * 
 * Props: none
 * 
 * State:
 * - form data
 */

import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import UserContext from "./UserContext";
import "./LoginForm.css";

const LoginForm = ({ login }) => {
  const { currentUser } = useContext(UserContext);
  const [form, setForm] = useState({
    username: "", password: ""
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
    const { username, password } = form;
    await login(username, password);
  }

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <div className="LoginForm-FormContainer">
        {/* <h1>Log In</h1> */}
        <Form
          className="LoginForm-Form"
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
          <div className="LoginForm-SubmitButton">
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

export default LoginForm;