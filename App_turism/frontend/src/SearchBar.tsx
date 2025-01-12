import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "./query";
import { useNavigate } from "react-router-dom";
import { convertDateToISOString } from "./PachetePage";

const SearchBar = ({ queryParameters, setQueryParameters, handleSearch }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  //   const [queryParameters.destination, setDestination] = useState({ id: 0, denumire: "" });
  //   const [queryParameters.departureCity, setDepartureCity] = useState({ id: 0, denumire: "" });
  //   const [date, setDepartureDate] = useState("");
  //   const [queryParameters.numAdults, setNumAdults] = useState(2);
  //   const [queryParameters.numChildren, setNumChildren] = useState(0);

  const { data: orase } = useQuery({
    queryKey: ["Orase"],
    queryFn: () => {
      return query("api/orase", {}, "GET");
    },
    refetchOnWindowFocus: false,
  });
  const { data: aeropoarte } = useQuery({
    queryKey: ["Aeropoarte"],
    queryFn: () => {
      return query("api/aeropoarte", {}, "GET");
    },
    refetchOnWindowFocus: false,
  });
  const handleOpenDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelectOption = (dropdown, value) => {
    setQueryParameters({ ...queryParameters, [dropdown]: value });
    // if (dropdown === "numPersons") setNumPersons(value);
    setActiveDropdown(null); // închide dropdown-ul
  };
  const increment = (type) => {
    setQueryParameters({
      ...queryParameters,
      [type]: queryParameters[type] + 1,
    });
  };

  const decrement = (type) => {
    setQueryParameters({
      ...queryParameters,
      [type]: queryParameters[type] - 1,
    });
  };

  //   const handleClick = () => {
  //     try {
  //       navigate("/pachete", {
  //         state: {
  //           destination: queryParameters.destination,
  //           departureCity: queryParameters.departureCity,
  //           departureDate: queryParameters.date,
  //           numAdults: queryParameters.numAdults,
  //           numChildren: queryParameters.numChildren,
  //         },
  //       });
  //     } catch (error) {}
  //   };

  return (
    <div className="container py-4">
      <div className="row g-3">
        {/* Unde mergi */}
        <div className="col-md-3">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => handleOpenDropdown("destination")}
          >
            Unde mergi?{" "}
            {(queryParameters.destination?.denumire && (
              <b>{queryParameters.destination.denumire}</b>
            )) ||
              "Selectează"}
          </button>
          {activeDropdown === "destination" && (
            <div className="dropdown-menu show p-3">
              <h5>Destinații disponibile</h5>
              <ul className="list-unstyled">
                {orase?.map((oras) => (
                  <li key={oras.id}>
                    <button
                      className="btn btn-link"
                      onClick={() =>
                        handleSelectOption("destination", {
                          denumire: oras.denumire,
                          id: oras.id,
                        })
                      }
                    >
                      {oras.denumire}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* De la */}
        <div className="col-md-3">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => handleOpenDropdown("departureCity")}
          >
            De la? {queryParameters.departureCity?.denumire || "Selectează"}
          </button>
          {activeDropdown === "departureCity" && (
            <div className="dropdown-menu show p-3">
              <h5>Orașe cu aeroporturi</h5>
              <ul className="list-unstyled">
                {aeropoarte?.map((aeroport) => (
                  <li key={aeroport.id}>
                    <button
                      className="btn btn-link"
                      onClick={() =>
                        handleSelectOption("departureCity", {
                          denumire: aeroport.localitatePlecare.denumire,
                          id: aeroport.localitatePlecare.id,
                        })
                      }
                    >
                      {aeroport.localitatePlecare.denumire}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Când vei pleca */}
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={convertDateToISOString(queryParameters.date)}
            onChange={(e) =>
              setQueryParameters({
                ...queryParameters,
                date: new Date(e.target.value),
              })
            }
          />
        </div>

        {/* Câte persoane */}
        <div className="col-md-3">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => handleOpenDropdown("numPersons")}
          >
            Câte persoane? {queryParameters.numAdults} adulți{" "}
            {queryParameters.numChildren} copii
          </button>
          {activeDropdown === "numPersons" && (
            <div
              className="dropdown-menu show p-3"
              style={{ minWidth: "300px" }}
            >
              <h5>Câți veți fi?</h5>
              <div className="d-flex justify-content-between align-items-center my-2">
                <span>Adulți</span>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => decrement("numAdults")}
                  >
                    −
                  </button>
                  <span className="mx-2">{queryParameters.numAdults}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => increment("numAdults")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center my-2">
                <span>Copii</span>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => decrement("numChildren")}
                  >
                    −
                  </button>
                  <span className="mx-2">{queryParameters.numChildren}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => increment("numChildren")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setActiveDropdown(null)}
                >
                  Închide
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Butonul de confirmare */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleSearch}>
          Caută
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
