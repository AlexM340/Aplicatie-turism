import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "./query";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";
export const convertDateToISOString = (date) => {
  if (!date) return ""; // În cazul în care data este nulă, returnăm un șir gol
  const year = date.getFullYear(); // Obținem anul
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Obținem luna și adăugăm un zero în față dacă este necesar
  const day = String(date.getDate()).padStart(2, "0"); // Obținem ziua și adăugăm un zero în față dacă este necesar
  return `${year}-${month}-${day}`; // Concatenăm anul, luna și ziua în formatul dorit (yyyy-mm-dd)
};
const PachetePage = () => {
  const location = useLocation();
  const [queryParameters, setQueryParameters] = useState(() => {
    return location.state && Object.keys(location.state).length
      ? {...location.state.location}
      : {
          destination: { id: 0, denumire: "" },
          departureCity: { id: 0, denumire: "" },
          date: new Date(),
          numAdults: 2,
          numChildren: 0,
        };
  });
  console.log(queryParameters);
  
  // console.log(location.state);
  // if (Object.keys(location?.state).length) {
  //   setQueryParameters(location.state) ;
  // }
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["PachetePage", queryParameters],
    queryFn: () =>
      query(
        "api/cautarePachete",
        {
          ...queryParameters,
          // destination: queryParameters.destination.id,
          // departureCity: queryParameters.departureCity.id,
          numPersons: queryParameters.numAdults + queryParameters.numChildren,
          tip: "pachete",
        },
        "POST"
      ),

    // refetchOnWindowFocus: false,
    // enabled: !!queryParameters.numPersons && !!queryParameters.dataPlecare,
  });
  console.log(data);
  return (
    <div className="container mt-4">
      <h1 className="text-center">Pachete turistice</h1>
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

export default PachetePage;
