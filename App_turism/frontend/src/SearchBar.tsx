import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "./query";

const SearchBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [destination, setDestination] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);

  const { data: orase } = useQuery({
    queryKey: ["Orase"],
    queryFn: () => {
      return query("api/orase", {}, "GET");
    },
  });
  console.log(orase);
  const handleOpenDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelectOption = (dropdown, value) => {
    if (dropdown === "destination") setDestination(value);
    if (dropdown === "departureCity") setDepartureCity(value);
    // if (dropdown === "numPersons") setNumPersons(value);
    setActiveDropdown(null); // închide dropdown-ul
  };
  const increment = (type) => {
    if (type === "adults") setNumAdults((prev) => prev + 1);
    if (type === "children") setNumChildren((prev) => prev + 1);
  };

  const decrement = (type) => {
    if (type === "adults" && numAdults > 1) setNumAdults((prev) => prev - 1);
    if (type === "children" && numChildren > 0)
      setNumChildren((prev) => prev - 1);
  };

  return (
    <div className="container py-4">
      <div className="row g-3">
        {/* Unde mergi */}
        <div className="col-md-3">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => handleOpenDropdown("destination")}
          >
            Unde mergi? {(destination && <b>{destination}</b>) || "Selectează"}
          </button>
          {activeDropdown === "destination" && (
            <div className="dropdown-menu show p-3">
              <h5>Destinații disponibile</h5>
              <ul className="list-unstyled">
                {orase?.map((oras) => (
                  <li>
                    <button
                      className="btn btn-link"
                      onClick={() =>
                        handleSelectOption("destination", oras.denumire)
                      }
                    >
                      {oras.denumire}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      handleSelectOption("destination", "Emiratele Arabe Unite")
                    }
                  >
                    Emiratele Arabe Unite
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-link"
                    onClick={() => handleSelectOption("destination", "Grecia")}
                  >
                    Grecia
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-link"
                    onClick={() => handleSelectOption("destination", "Italia")}
                  >
                    Italia
                  </button>
                </li>
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
            De la? {departureCity || "Selectează"}
          </button>
          {activeDropdown === "departureCity" && (
            <div className="dropdown-menu show p-3">
              <h5>Orașe cu aeroporturi</h5>
              <ul className="list-unstyled">
                <li>
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      handleSelectOption("departureCity", "Bucharest Otopeni")
                    }
                  >
                    Bucharest Otopeni
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      handleSelectOption("departureCity", "Cluj Napoca")
                    }
                  >
                    Cluj Napoca
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      handleSelectOption("departureCity", "Timisoara")
                    }
                  >
                    Timișoara
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Când vei pleca */}
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {/* Câte persoane */}
        <div className="col-md-3">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => handleOpenDropdown("numPersons")}
          >
            Câte persoane? {numAdults} adulți {numChildren} copii
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
                    onClick={() => decrement("adults")}
                  >
                    −
                  </button>
                  <span className="mx-2">{numAdults}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => increment("adults")}
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
                    onClick={() => decrement("children")}
                  >
                    −
                  </button>
                  <span className="mx-2">{numChildren}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => increment("children")}
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
        <button className="btn btn-primary">Confirmă și caută</button>
      </div>
    </div>
  );
};

export default SearchBar;
