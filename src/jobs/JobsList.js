import React from "react";
import JobCard from "./JobCard";

const JobsList = (props) => {
  // track the company being displayed in state
  // need useEffect here 

  console.log("JOBSLIST JOBS: ", props.jobs);

  console.log("JOBS: ", props.jobs);
  return (
    <div className="JobsList">
      {props.jobs.map(j => 
        <JobCard
          key={j.id}
          title={j.title}
          company={j.companyName}
          salary={j.salary} 
          equity={j.equity}
        />
      )}
    </div>
  )
}

export default JobsList;