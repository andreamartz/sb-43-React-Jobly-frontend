import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../homepage/HomePage";
import CompaniesPage from "../companies/CompaniesPage";
import CompanyDetailsPage from "../companies/CompanyDetailsPage";
import JobsPage from "../jobs/JobsPage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";

function Routes({ signup, login }) {

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <PrivateRoute exact path="/companies">
        <CompaniesPage />
      </PrivateRoute>
      <PrivateRoute exact path="/companies/:handle">
        <CompanyDetailsPage />
      </PrivateRoute>
      <PrivateRoute exact path="/jobs">
        <JobsPage />
      </PrivateRoute>
      <Route exact path="/login">
        <LoginForm login={login}/>
      </Route>
      <Route exact path="/signup">
        <SignupForm signup={signup}/>
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