/** CompanyDetailsPage
 * 
 * Purpose:
 * - display details for a company, including:
 *   - display company name and description
 *   - display jobs open at the company
 * 
 * Props: none
 * 
 * State:
 * - jobs to display in the JobsList component
 * 
 * Hooks:
 * - useEffect to retrieve company information on initial page load
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobsList from "../jobs/JobsList";
import LoadingMessage from "../common/LoadingMessage";
import "./CompanyDetailsPage.css";

function CompanyDetailsPage() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();
  console.log("HANDLE in vars: ", handle);
  
  /** Load data from backend
   * - fetches company details
   * - runs only on first render of this component
   */
  useEffect(() => {
    async function getCompany() {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
    };
    getCompany();
  }, [handle]);

  /** getCompany(handle)
   * - takes a full or partial company name to search
   * - returns an array of matching company objects 
   */
  
  if (!company) return <LoadingMessage />;

  return (
    <div className="CompanyDetailsPage">
      <p className="h4">{company.name}</p>
      <p>{company.description}</p>
      <JobsList jobs={company.jobs} />
    </div>
  )
}

export default CompanyDetailsPage;