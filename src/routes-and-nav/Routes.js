import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import CompaniesPage from "../companies/CompaniesPage";
import CompanyDetailsPage from "../companies/CompanyDetailsPage";
import JobsPage from "../jobs/JobsPage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";

function Routes() {

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/companies">
        <CompaniesPage />
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetailsPage />
      </Route>
      <Route exact path="/jobs">
        <JobsPage />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Route>
        <p>Hmmm. I can't seem to find what you want.</p>
      </Route>
    </Switch>
  )
}

export default Routes;