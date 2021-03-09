/** CompaniesPage
 * 
 * Purpose:
 * - allow logged in user to search companies
 * - display all - or a filtered list of - companies
 * 
 * Props: none
 * 
 * State:
 * - companies to display in CompaniesList component
 * 
 * Hooks:
 * - useEffect to retrieve all companies on initial page load
 */

import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import SearchForm from "../common/SearchForm";
import CompaniesList from "./CompaniesList";
import "./CompaniesPage.css";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  
  /** Load data from backend
   * - fetches all companies (i.e., unfiltered list)
   * - runs only on first render of this component
   */
  useEffect(() => {
    search();
  }, []);

  /** search
   * - takes a full or partial company name to search
   * - returns an array of matching company objects 
   */
  async function search(searchTerm) {
    let companies = await JoblyApi.getCompanies(searchTerm);
    setCompanies(companies);
    return companies;
  }

  return (
    <div className="CompaniesPage">
      <SearchForm search={search}/>
      {companies.length
        ? <CompaniesList companies={companies}/>
        : <p>Sorry, no results were found!</p>
      } 
    </div>
  );
}

export default CompaniesPage;