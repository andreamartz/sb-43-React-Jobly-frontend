import React from "react";
import {
  Button,
  Card, 
  CardText, 
  CardBody,
  CardTitle, 
} from "reactstrap";
import "./JobCard.css";

const JobCard = ({ title, company, salary, equity }) => {
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
              {salary ? `Salary: ${salary}` : null}
            </small>
          </CardText>
          <CardText>
            <small>
              {equity ? `Equity: ${equity}` : null}
            </small>
          </CardText>
          <div className="JobCard-Button">
            <Button color="danger">APPLY</Button>
            <Button color="danger" disabled>APPLIED</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default JobCard;