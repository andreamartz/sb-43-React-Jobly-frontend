import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JobsList from "./JobsList";
import JoblyApi from "../api";
import "./JobsPage.css";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  /** Load data from backend
   * - fetches all jobs (i.e., unfiltered list)
   * - runs only on first render of this component
   */
  useEffect(() => {
    console.log("INSIDE USEEFFECT ON JOBS PAGE");
    search();
    }, []);

    /** search
     * - takes a full or partial job title to search
     * - returns an array of matching job objects 
     */
    async function search(searchTerm) {
      let jobs = await JoblyApi.getJobs(searchTerm);
      setJobs(jobs);
      return jobs;
    }

  return (
    <div className="JobsPage">
      <SearchForm search={search}/>
      {jobs.length
        ? <JobsList jobs={jobs}/>
        : <p>Sorry, no results were found!</p>
      }
    </div>
  )
}

export default JobsPage;