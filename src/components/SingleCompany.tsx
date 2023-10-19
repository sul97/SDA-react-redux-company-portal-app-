import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSingleData } from "../features/compainesSlice";
import { AppDispatch, RootState } from "../store";


const SingleCompany = () => {
  const { id } = useParams();
  const { singleCompany, isLoading, error } = useSelector((state: RootState) => state.compainesReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleData(Number(id))); 
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading the data</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {singleCompany && (
        <article>
          <img src={singleCompany.avatar_url} alt={singleCompany.login} />
          <p>{singleCompany.login}</p>
          <p>{singleCompany.description}</p>
        </article>
      )}
    </div>
  );
};

export default SingleCompany;
