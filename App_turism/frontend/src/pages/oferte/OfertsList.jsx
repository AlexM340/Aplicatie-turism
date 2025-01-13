import { useState, useEffect } from "react";
import OfertCard from "./OfertCard";
import { useQuery } from "@tanstack/react-query";
import { query } from "../../utils/query";
import { useNavigate } from "react-router-dom";

const countryImages = {
  Romania:
    "https://images.pexels.com/photos/15787938/pexels-photo-15787938.jpeg",
  Grecia:
    "https://images.pexels.com/photos/14399677/pexels-photo-14399677.jpeg",
  Spania:
    "https://images.pexels.com/photos/54097/spain-flag-flutter-spanish-54097.jpeg",
  Islanda:
    "https://images.pexels.com/photos/10590507/pexels-photo-10590507.jpeg",
  Finlanda: "https://images.pexels.com/photos/997611/pexels-photo-997611.jpeg",
  Bulgaria:
    "https://images.pexels.com/photos/11502129/pexels-photo-11502129.jpeg",
  Italia: "https://images.pexels.com/photos/7522/pexels-photo.jpg",
  Croatia: "https://images.pexels.com/photos/2722939/pexels-photo-2722939.jpeg",
  Ungaria:
    "https://images.pexels.com/photos/10598690/pexels-photo-10598690.jpeg",
  Egipt: "https://images.pexels.com/photos/13884502/pexels-photo-13884502.jpeg",
  Turcia: "https://images.pexels.com/photos/3122147/pexels-photo-3122147.jpeg",
  Franta:
    "https://pexels.com/photo/france-flag-on-gray-concrete-building-near-road-2272939/.jpeg",
  Default:
    "https://pexels.com/photo/aerial-photography-of-building-city-lights-1036657/.jpeg", // Default fallback image
};

const OfertsList = () => {
  const navigate = useNavigate();
  const [travelOferts, setTravelOferts] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["OfertsList"],
    queryFn: () => query("api/tari", undefined, "GET"),
  });

  useEffect(() => {
    if (data) {
      setTravelOferts(data);
    }
  }, [data]);

  const handleClick = (location) => {
    const country = data.find((country) => country.denumire === location);
    navigate("/pachete", {
      state: {
        location: {
          destination: { id: 0, denumire: "" },
          departureCity: { id: 0, denumire: "" },
          date: new Date(),
          numAdults: 2,
          numChildren: 0,
          country: country,
          maxPrice: 6000,
        },
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      {error && <p>{error.message}</p>}
      <div className="row">
        {travelOferts?.map((ofert, index) => (
          <div className="col-md-4" key={index}>
            {" "}
            <OfertCard
              image={countryImages[ofert.denumire] || countryImages.Default}
              price={ofert.pret}
              location={ofert.denumire}
              description={"foarte frumos"}
              handleClick={handleClick}
              buttonText="Descoperă"
              priceText="Prețuri de la"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertsList;