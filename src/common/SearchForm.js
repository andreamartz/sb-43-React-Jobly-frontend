/** SearchForm
 * 
 * Props: fcn to update filtered list of data (companies or jobs) to show
 * 
 * State:
 * - form data
 */

import React, { useState } from "react";
import { Button, Form, InputGroup, Input } from "reactstrap";
import "./SearchForm.css";

const SearchForm = ({ search }) => {
  const [form, setForm] = useState({
    searchTerm: ""
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
    let { searchTerm } = form;
    if (!searchTerm) {
      search();
    } else {
      search(searchTerm);
    }
  }

  return (
    <Form
      className="SearchForm"
      onSubmit={handleSubmit}
    >
      <InputGroup>
        <Input 
          type="text"
          name="searchTerm"
          id="searchTerm"
          value={form.searchTerm}
          onChange={handleChange}
          placeholder="Enter search term..."
          bsSize="lg"
        />
        <Button 
          type="submit" 
          color="primary"
          size="lg"
        >
          Submit
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchForm;