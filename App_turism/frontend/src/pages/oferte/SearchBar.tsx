import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "../../utils/query";
import { useNavigate } from "react-router-dom";
import { convertDateToISOString } from "./pachete/PachetePage";

const SearchBar = ({ queryParameters, setQueryParameters, handleSearch }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    setActiveDropdown(null);
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

  const resetFilters = () => {
    setQueryParameters({maxPrice:6000,
      destination: null,
      departureCity: null,
      date: new Date(),
      numAdults: 2,
      numChildren: 0,
    });
    setActiveDropdown(null);
  };

  return (
    <div className="container py-4">
      <div className="row g-3">
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

      <div className="text-center mt-4">
        <button className="btn btn-primary me-2" onClick={handleSearch}>
          Caută
        </button>
        <button className="btn btn-danger" onClick={resetFilters}>
          Resetează filtrele
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
