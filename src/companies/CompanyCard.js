import React from "react";
import {
  Card, 
  CardText, 
  CardBody,
  CardTitle, 
} from "reactstrap";
import "./CompanyCard.css";

const CompanyCard = ({ name, description }) => {
  return (
    <div className="CompanyCard">
      <Card className="CompanyCard-Card">
        <CardBody className="CompanyCard-CardBody">
          <CardTitle className="CompanyCard-CardTitle">
            {name}
          </CardTitle>
          <CardText>
            <small>
              {description}
            </small>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default CompanyCard;