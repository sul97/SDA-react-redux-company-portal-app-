import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "../features/compainesSlice";
import SortCompany from "./SortCompany";
import { AppDispatch, RootState } from "../store";
import "../index.css";
import { Link } from "react-router-dom"


const Companies = () => {
  const { data, isLoading, error } = useSelector((state: RootState) => state.compainesReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [searchCompanies, setSearchCompanies] = useState<string>("");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading the data</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const companyName = event.target.value;
    setSearchCompanies(companyName);
  };

  const searchCompany = data.filter((company) => {
    return company.login.toLowerCase().includes(searchCompanies.toLowerCase());
  });

  return (
    <div>
      <h1>Companies</h1>
      <div className="action">
      <input
        type="text"
        placeholder="Enter Company Name"
        value={searchCompanies}
        onChange={handleSearchChange}
      />
     
      <SortCompany/>
      </div>
     
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          { searchCompany.length === 0 && searchCompanies !== ""  ? (
            <tr>
              <td ><h2>No matching</h2></td>
            </tr>
          ) : (
            searchCompany.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td><img src={company.avatar_url} alt={company.login} className="company-logo" /></td>
                <td>{company.login}</td>
                <td>
                  <Link to={`/companies/${company.id}`}>
                  <button>show more</button>
                  </Link>
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
   
    </div>
  );
};

export default Companies;
