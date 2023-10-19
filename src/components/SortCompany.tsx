import { useDispatch } from "react-redux"
import { ChangeEvent } from "react";

import { sortCompanies } from "../features/compainesSlice";

const SortCompany = () => {
    const dispatch = useDispatch();

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(sortCompanies(event.target.value));
    };
  return ( 
    <div>
        <label htmlFor="sort">Sorrt By : </label>
        <select name="sort" id="sort" onChange={handleOptionChange}>
            <option defaultValue="id">id</option>
            <option value="login">login</option>
        </select>
    </div>
  );
};

export default SortCompany