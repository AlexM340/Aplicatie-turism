import React, { useState } from "react";
import OfertsList from "./OfertsList";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [queryParameters, setQueryParameters] = useState({
    destination: { id: 0, denumire: "" },
    departureCity: { id: 0, denumire: "" },
    date: new Date(),
    numAdults: 2,
    numChildren: 0,
  });
  const handleSearch = () => {
    navigate("/pachete", { state: { location: queryParameters } });
  };
  console.log(queryParameters);

  return (
    <div>
      <SearchBar
        queryParameters={queryParameters}
        setQueryParameters={setQueryParameters}
        handleSearch={handleSearch}
      />
      <OfertsList />
    </div>
  );
};

export default LandingPage;
