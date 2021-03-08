import React from "react";
import { useParams } from "react-router-dom";
import JobsList from "../jobs/JobsList";
// need to import useParams

function CompaniesDetailsPage() {
  const { handle } = useParams();
  console.log("HANDLE: ", handle);
  return (
    <>
      <h1>COMPANY DETAILS PAGE</h1>
      <h2>Company Description</h2>
    </>
  )
}

export default CompaniesDetailsPage;