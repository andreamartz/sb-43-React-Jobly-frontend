/** LoginForm
 * 
 * Purposes: 
 * - display a form to login
 *   - as user types in the form, keeps track of form data in state
 * - on form submission: 
 *   - authenticates a user and grants them access to according to their permissions
 *   - if successful login, redirects to /companies route
 * 
 * Props: none
 * 
 * State:
 * - form data
 * 
 * Routes -> LoginForm ->
 * 
 * Routing path: /login
 */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Alert from "../common/Alert";
import "./LoginForm.css";

const LoginForm = ({ login }) => {
  const history = useHistory();
  const [form, setForm] = useState({
    username: "", password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", form,
    "formErrors", formErrors
  );

  /** Update form data in state */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  /** fcn handleSubmit 
   * Handles form submission
   *   - calls login fcn prop and...
   *   -...if successful, redirects to /companies
   */
  const handleSubmit = async evt => {
    evt.preventDefault();
    const { username, password } = form;
    const result = await login(username, password);
    console.log("RESULT: ", result);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.data.error);
    }
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
              required
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
              required
              onChange={handleChange}
              bsSize="md"
            />
          </FormGroup>

          {/* Display errors, if any */}
          {formErrors
            ? <Alert type="danger" messages={formErrors} />
            : null
          }
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