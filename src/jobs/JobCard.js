/** JobCard component
 * 
 * Purpose: 
 * - to show limited information about a job
 * - is rendered by JobsList to show a "card" for each job.
 * 
 * Props: 
 * - jobId
 * - title
 * - company
 * - salary
 * - equity
 * 
 * State: 
 * - applied
 * 
 * Effect:
 * - re-render when applied state changes
 * - re-render when there is a new jobId
 * 
 * Context:
 * - UserContext: 
 *     - currentUser
 *     - hasAppliedToJob -> fcn that returns boolean
 *     - applyToJob -> fcn that updates application status to true
 */

import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card, 
  CardText, 
  CardBody,
  CardTitle, 
} from "reactstrap";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

const JobCard = ({ jobId, title, company, salary, equity }) => {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  const [applied, setApplied] = useState();
  
  /** effect: updateApplied 
   * if already applied (when hasAppliedToJob returns true): 
   *   - setApplied(true)
   * if not already applied: 
   *   - call API class method to update application status in db and return obj {applied: jobId}
   *   - update applied state setApplied(true)
  */

  useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", jobId);

    setApplied(hasAppliedToJob(jobId));

  }, [jobId, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(jobId)) return;
    applyToJob(jobId);    
    setApplied(true);
  }

  return (
    <div className="JobCard">
      <Card className="JobCard-Card">
        <CardBody className="JobCard-CardBody">
          <CardTitle className="JobCard-CardTitle">
            {title}
          </CardTitle>
          <CardTitle>
            {company ? company : null}
          </CardTitle>
          <CardText>
            <small>
              {salary ? `Salary: ${formatSalary(salary)}` : null}
            </small>
          </CardText>
          <CardText>
            <small>
              {equity ? `Equity: ${equity}` : null}
            </small>
          </CardText>
          <div className="JobCard-Button">
            <Button 
              color="danger"
              onClick={handleApply}
              disabled={applied}>
              {applied
                ? "APPLIED"
                : "APPLY"
              }
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

/** Render integer salary like '$1,250,343' */

// function formatSalary(salary) {
//   const digitsRev = [];
//   const salaryStr = salary.toString();

//   for (let i = salaryStr.length - 1; i >= 0; i--) {
//     digitsRev.push(salaryStr[i]);
//     if (i > 0 && i % 3 === 0) digitsRev.push(",");
//   }

//   return digitsRev.reverse().join("");
// }

function formatSalary(salary) {
  const formattedSalary = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD'
    }
  ).format(salary);
  return formattedSalary;
}

export default JobCard;