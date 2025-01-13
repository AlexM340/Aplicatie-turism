import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { query } from "./query";
import SearchBar from "./SearchBar";
import OfertCard from "./OfertCard";

export const convertDateToISOString = (date) => {
  if (!date) return "";
  const validDate = new Date(date);

  if (isNaN(validDate)) return "";

  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, "0");
  const day = String(validDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const formatData = (date) => {
  if (!(date instanceof Date)) {
    throw new Error("Input must be a valid Date object");
  }
  const pad = (number) => String(number).padStart(2, "0");
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

const PachetePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/pachete/${id}`);
  };

  const [queryParameters, setQueryParameters] = useState(() => {
    return location.state && Object.keys(location.state).length
      ? { ...location.state.location }
      : {
          destination: { id: 0, denumire: "" },
          departureCity: { id: 0, denumire: "" },
          date: new Date(),
          numAdults: 2,
          numChildren: 0,
          maxPrice: 6000,
          country: { id: 0, denumire: "" },
        };
  });
  const { data: tari } = useQuery({
    queryKey: ["Tari"],
    queryFn: () => query("api/tari", {}, "GET"),
    refetchOnWindowFocus: false,
  });

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["PachetePage", queryParameters],
    queryFn: () =>
      query(
        "api/cautarePachete",
        {
          ...queryParameters,
          numPersons: queryParameters.numAdults + queryParameters.numChildren,
          tip: "pachete",
        },
        "POST"
      ),
  });
  console.log(location.state?.location);

  // Apply country and price filters
  const filteredData = data?.filter(
    (pachet) =>
      pachet.pret <= queryParameters.maxPrice &&
      (queryParameters.country?.denumire
        ? pachet.camera.cazare.localitate.tara.denumire ===
          queryParameters.country?.denumire
        : true)
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center">Pachete turistice</h1>
      <div className="row">
        <SearchBar
          queryParameters={queryParameters}
          setQueryParameters={setQueryParameters}
          handleSearch={() => refetch()}
        />
        <div className="col-md-3">
          {/* Filter for maximum price */}
          <div className="filter-section">
            <h5>Preț maxim</h5>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="6000"
                step="10"
                value={queryParameters.maxPrice}
                onChange={(e) =>
                  setQueryParameters({
                    ...queryParameters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
              />
              <p>Max {queryParameters.maxPrice}€</p>
            </div>
          </div>

          {/* Filter for country */}
          <div className="country-filter mt-3">
            <h5>Țara</h5>
            <select
              value={queryParameters.country?.id}
              onChange={(e) => {
                const selectedCountry = tari.find(
                  (tara) => tara.id === parseInt(e.target.value)
                );
                setQueryParameters({
                  ...queryParameters,
                  country: selectedCountry,
                });
              }}
              className="form-select"
            >
              <option value={0}>Selectează țara</option>
              {tari?.map((tara) => (
                <option key={tara.id} value={tara.id}>
                  {tara.denumire}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display results */}
        {!isLoading && !isRefetching ? (
          <div className="col-md-9">
            <div className="row">
              {filteredData?.map((pachet, index) => (
                <div
                  className="w-100 mb-3"
                  key={index}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div style={{ width: "100%", maxWidth: "900px" }}>
                    <OfertCard
                      image={
                        pachet.camera.cazare.imagine ||
                        "https://images.pexels.com/photos/5227434/pexels-photo-5227434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      price={pachet.pret}
                      hotelName={pachet.camera.cazare.nume}
                      location={pachet.camera.cazare.localitate.denumire}
                      description={pachet.camera.cazare.descriere}
                      buttonText="Vizualizare"
                      checkInDate={formatData(new Date(pachet.data_checkin))}
                      checkOutDate={formatData(new Date(pachet.data_checkout))}
                      handleClick={() => handleViewDetails(pachet.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default PachetePage;
