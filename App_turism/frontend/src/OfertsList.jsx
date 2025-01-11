import { useState } from "react";
import OfertCard from "./OfertCard";
import { useQuery } from "@tanstack/react-query";
import { query } from "./query";
import { useNavigate } from "react-router-dom";

/**
 * OfertsList Component
 *
 * Componenta care afișează o listă de pachete de călătorie
 *
 * @returns {JSX.Element} Componenta React care conține butonul de încărcare și lista ofertelor.
 */
const OfertsList = () => {
  const navigate = useNavigate();
  const [travelOferts, setTravelOferts] = useState(undefined); // State pentru ofertele de călătorie
  const [loading, setLoading] = useState(false); // Începe fără încărcare
  const [error, setError] = useState(null); // Capturăm erorile
  // console.log(travelOferts[0][0].pret)

  const { data, isLoading } = useQuery({
    queryKey: ["OfertsList"],
    queryFn: () => {
      return query("api/tari", undefined, "GET");
    },
  });
  console.log(data);
  if (data && !travelOferts) {
    setTravelOferts(data);
  }
  const handleClick = (location) => {
    navigate("/pachete", {
      state: {
        location: {
          destination: { id: 0, denumire: "" },
          departureCity: { id: 0, denumire: "" },
          date: new Date(),
          numAdults: 2,
          numChildren: 0,
          tara: location,
        },
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container mt-4">
      {loading && <p>Loading...</p>}{" "}
      {/* Afișăm mesajul de încărcare când datele sunt obținute */}
      {error && <p>{error}</p>}{" "}
      {/* Afișăm mesajul de eroare dacă ceva nu merge bine */}
      <div className="row">
        {travelOferts?.map((ofert, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <OfertCard
              image={
                "data:image/jpeg;base64,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"
              } // Presupunem că ai un câmp `image` în datele din backend
              price={ofert.pret} // Presupunem că ai un câmp `price` în datele din backend
              location={ofert.denumire} // Presupunem că ai un câmp `location` în datele din backend
              description={"O tara frumoasa"} // Presupunem că ai un câmp `description` în datele din backend
              handleClick={handleClick} // O funcție care se apelează când se face clic pe
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertsList;
