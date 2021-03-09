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
 
 function CompanyDetailsPage() {
   const [company, setCompany] = useState({});
   const { handle } = useParams();
   
   /** Load data from backend
    * - fetches company details
    * - runs only on first render of this component
    */
   useEffect(() => {
     console.log("INSIDE USEEFFECT ON COMP DETS PAGE");
     getCompany();
   }, []);
 
   /** getCompany(handle)
    * - takes a full or partial company name to search
    * - returns an array of matching company objects 
    */
   async function getCompany() {
     let company = await JoblyApi.getCompany(handle);
     setCompany(company);
     return company;
   }
   
   if (!company) return <LoadingMessage />;
 
   return (
     <div className="CompanyDetailsPage">
       <h1>{company.name}</h1>
       <h2>{company.description}</h2>
       <JobsList jobs={company.jobs} />
     </div>
   )
 }
 
 export default CompanyDetailsPage;