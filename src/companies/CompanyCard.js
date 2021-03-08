import React from "react";
import {
  Card, 
  CardText, 
  CardBody,
  CardTitle, 
} from "reactstrap";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ handle, name, description }) => {
  return (
    <div className="CompanyCard">
      <Link 
        to={`/company/${handle}`} className="CompanyCard-Link"
      >
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
      </Link>
    </div>
  );
}

export default CompanyCard;