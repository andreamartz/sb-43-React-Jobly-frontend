import React from "react";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";
import "./CompaniesList.css";

const CompaniesList = ({ companies }) => {
  return (
    <div className="CompaniesList">
      {companies.map(c => {
        return (
          <Link 
            to={`/companies/${c.handle}`} 
            key={c.handle} 
            className="CompaniesList-Link"
          >
            <CompanyCard 
              name={c.name} 
              description={c.description}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default CompaniesList;