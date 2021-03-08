import React from "react";
import CompanyCard from "./CompanyCard";

const CompaniesList = ({ companies }) => {
  return (
    <div className="CompaniesList">
      {companies.map(c => 
        (<CompanyCard 
          key={c.handle}
          handle={c.handle}
          name={c.name} 
          description={c.description}
        />)
      )}
    </div>
  )
}

export default CompaniesList;