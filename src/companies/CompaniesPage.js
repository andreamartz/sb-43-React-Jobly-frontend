/** CompaniesPage
 * 
 * Purpose:
 * - allow logged in user to search companies
 * - display all - or a filtered list of - companies
 * 
 * Props: none
 * 
 * State:
 * - isLoading: boolean, has data loaded yet?
 * - companies to display in CompaniesList component
 * 
 * Hooks:
 * - useEffect to show 'Loading...' or page content
 */

import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import SearchForm from "../SearchForm";
import CompaniesList from "./CompaniesList";
import "./CompaniesPage.css";

function CompaniesPage() {
  let tempCompanies = [
    {
      handle: "burton-ltd",
      name: "Burton Ltd",
      description: "Cover couple speech bar cell measure movement finally. Nation pull inside.",
      numEmployees: 610,
      logoUrl: "/logos/logo4.png"
    },
    {
      "handle": "owen-newton",
      name: "Owen-Newton",
      "description": "Red compare try way. Bed standard again number wrong force. Stop exactly agent product economy someone. North describe site manager employee customer.",
      "numEmployees": 953,
      "logoUrl": null
    },
    {
      "handle": "stone-stewart",
      name: "Stone-Stewart",
      "description": "Require successful family but. Traditional article late eight lose common send budget. Better opportunity law country various represent strong probably.",
      "numEmployees": 459,
      "logoUrl": null
    }
  ];

  const [isLoading, setIsLoading] = useState(true);

  const [companiesToDisplay, setCompaniesToDisplay] = useState(tempCompanies);
  
  /** Load data from backend */
  // useEffect(() => {
  //   let companies = search();
  //   setCompaniesToDisplay(companies);
  // }, []);

  async function search(searchTerm) {
    let companies = await JoblyApi.getCompanies(searchTerm);
    console.log("COMPANIES: ", companies);
    console.log("SEARCH TERM: ", searchTerm);
    // setIsLoading(false);
    return companies;
  }

  // if (isLoading) {
  //   return <p>Loading &hellip;</p>;
  // }

  return (
    <div className="CompaniesPage">
      <SearchForm search={search}/>
      <CompaniesList companies={companiesToDisplay}/> 
    </div>
  )
}

export default CompaniesPage;