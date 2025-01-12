import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "./query";
import SearchBar from "./SearchBar";
import OfertCard from "./OfertCard"; // Import the OfertCard component

const cazareImages = {
  "Hotel Elena":
    "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg",
  "Hotel Diafan":
    "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg",
  "Pensiunea 3 pini":
    "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg",
  "Hotel Continental":
    "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  "Hotel Caesar":
    "https://images.pexels.com/photos/2255424/pexels-photo-2255424.jpeg",
  Default: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
};

const CazarePage = () => {
  const [queryParameters, setQueryParameters] = useState({
    destination: { id: 0, denumire: "" },
    departureCity: { id: 0, denumire: "" },
    date: new Date(),
    numAdults: 2,
    numChildren: 0,
    maxPrice: 6000,
    location: "",
    country: "",
  });

  const { data: tari } = useQuery({
    queryKey: ["Tari"],
    queryFn: () => {
      return query("api/tari", {}, "GET");
    },
    refetchOnWindowFocus: false,
  });

  const { data: orase } = useQuery({
    queryKey: ["Orase"],
    queryFn: () => {
      return query("api/orase", {}, "GET");
    },
    refetchOnWindowFocus: false,
  });

  const filteredCities = queryParameters.countryId
    ? orase?.filter((oras) => oras.id_tara === queryParameters.countryId)
    : orase;

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["CazarePage", queryParameters],
    queryFn: () =>
      query(
        "api/cautarePachete",
        {
          ...queryParameters,
          numPersons: queryParameters.numAdults + queryParameters.numChildren,
          tip: "cazare",
        },
        "POST"
      ),
  });

  const filteredData = data?.filter(
    (cazare) =>
      cazare.pret <= queryParameters.maxPrice &&
      (queryParameters.location
        ? cazare.camera.cazare.localitate.denumire === queryParameters.location
        : true) &&
      (queryParameters.country
        ? cazare.camera.cazare.localitate.tara.denumire ===
          queryParameters.country
        : true)
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center">Cazari</h1>
      <div className="row">
        <div className="row">
          <SearchBar
            queryParameters={queryParameters}
            setQueryParameters={setQueryParameters}
            handleSearch={() => refetch()} // Trigger search when necessary
          />
          <div className="col-md-3">
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
            <div className="country-filter mt-3">
              <h5>Țara</h5>
              <select
                value={queryParameters.country}
                onChange={(e) => {
                  const selectedCountry = e.target.value;
                  const selectedCountryId = tari.find(
                    (tara) => tara.denumire === selectedCountry
                  )?.id;
                  setQueryParameters({
                    ...queryParameters,
                    country: selectedCountry,
                    countryId: selectedCountryId, // Stochează și ID-ul țării
                    location: "", // Resetează localitatea
                  });
                }}
                className="form-select"
              >
                <option value="">Selectează țara</option>
                {tari?.map((tara) => (
                  <option key={tara.id} value={tara.denumire}>
                    {tara.denumire}
                  </option>
                ))}
              </select>
            </div>
            <div className="location-filter mt-3">
              <h5>Localitate</h5>
              <select
                value={queryParameters.location}
                onChange={(e) =>
                  setQueryParameters({
                    ...queryParameters,
                    location: e.target.value,
                  })
                }
                className="form-select"
              >
                <option value="">Selectează Localitatea</option>
                {filteredCities && filteredCities.length > 0 ? (
                  filteredCities.map((oras) => (
                    <option key={oras.id} value={oras.denumire}>
                      {oras.denumire}
                    </option>
                  ))
                ) : (
                  <option value="">Nicio localitate disponibilă</option>
                )}
              </select>
            </div>
          </div>
          {!isLoading && !isRefetching ? (
            <div className="col-md-9">
              {filteredData?.map((cazare, index) => (
                <div
                  className="w-100 mb-3"
                  key={index}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div style={{ width: "100%", maxWidth: "900px" }}>
                    <OfertCard
                      image={
                        cazareImages[cazare.camera.cazare.nume] ||
                        cazareImages.Default
                      }
                      price={cazare.pret}
                      location={cazare.camera.cazare.nume}
                      description={cazare.camera.cazare.localitate.denumire}
                      buttonText="Rezervă"
                      handleClick={(location) =>
                        console.log(`Booking hotel for: ${location}`)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CazarePage;