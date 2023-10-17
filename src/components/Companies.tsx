import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/compainesSlice";
import { RootState } from "../store";
import "../index.css";

type CompanyType = {
    id: number;
    login: string; 
    avatar_url: string; 
  }

const Companies = () => {
 const { data , isLoading , error } = useSelector((state :  RootState) => state.compainesReducer);
 const dispatch = useDispatch<any>();
 const [searchCompanies, setSearchCompanies] = useState("");
 
    useEffect(() => {
     dispatch(fetchData());
    }, [dispatch])

    if(isLoading){
        return <p>Loading the data</p>
    }
    if(error){
        return <p>{error}</p>
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCompanies(event.target.value);
      };

    const searchCompany = data.filter((company: CompanyType) => {
        return company.login.toLowerCase().includes(searchCompanies.toLowerCase());
      });

    return(
        <div>
        <h1>Companies</h1>
        <input
        type="text"
        placeholder="Enter Company Name"
        value={searchCompanies}
        onChange={handleSearchChange} 
      />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>
           {searchCompany.map((company: CompanyType) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.login}</td> 
                <td><img src={company.avatar_url} alt="company logo" className="company-logo" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Companies;