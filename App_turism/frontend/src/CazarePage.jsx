import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "./query";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

const CazarePage = () => {
  const location = useLocation();
  const [queryParameters, setQueryParameters] = useState({
    destination: { id: 0, denumire: "" },
    departureCity: { id: 0, denumire: "" },
    date: new Date(),
    numAdults: 2,
    numChildren: 0,
  });
  // console.log(location.state);
  // if (Object.keys(location?.state).length) {
  //   setQueryParameters(location.state) ;
  // }
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["CazarePage", queryParameters],
    queryFn: () =>
      query(
        "api/cautarePachete",
        {
          ...queryParameters,
          // destination: queryParameters.destination.id,
          // departureCity: queryParameters.departureCity.id,
          numPersons: queryParameters.numAdults + queryParameters.numChildren,
          tip: "cazare",
        },
        "POST"
      ),

    // refetchOnWindowFocus: false,
    // enabled: !!queryParameters.numPersons && !!queryParameters.dataPlecare,
  });
  console.log(data);
  return (
    <div className="container mt-4">
      <h1 className="text-center">Cazari</h1>
      <div className="row">
        <SearchBar
          queryParameters={queryParameters}
          setQueryParameters={setQueryParameters}
          handleSearch={() => refetch()}
        />
      </div>
      {!isLoading && !isRefetching ? (
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Cazare</th>
                <th>Locatie</th>
                <th>Preț</th>
                <th>Descriere</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((pachet, index) => (
                <tr key={index}>
                  <td>{pachet.camera.cazare.nume}</td>
                  <td>{pachet.camera.cazare.localitate.denumire}</td>
                  <td>{pachet.pret}</td>
                  <td>{pachet.camera.cazare.descriere}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CazarePage;
