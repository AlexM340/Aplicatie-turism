import React, { useState } from "react";
import OfertCard from "./OfertCard";

const OfertsList = () => {
  const [travelOferts, setTravelOferts] = useState([]); // State pentru ofertele de călătorie
  const [loading, setLoading] = useState(false); // Începe fără încărcare
  const [error, setError] = useState(null); // Capturăm erorile
// console.log(travelOferts[0][0].pret)
  // Funcția care face cererea către server atunci când este apelată

  /**
   * @description
   */
  const fetchOferts = () => {
    setLoading(true); // Începe să încarce
    fetch("http://localhost:5000/api/pachete")  // Presupunem că datele de oferte sunt în endpointul "/pachete"
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la obținerea ofertelor");
        }
        return response.json();
      })
      .then((data) => {
        setTravelOferts(data); // Stocăm ofertele obținute
        setLoading(false); // Oprim indicatorul de încărcare
      })
      .catch((error) => {
        setError(error.message); // Salvăm eroarea în state
        setLoading(false); // Oprim indicatorul de încărcare
      });
  };

  return (
    <div className="container mt-4">
      <button onClick={fetchOferts} className="btn btn-primary mb-4">
        Încarcă ofertele
      </button>

      {loading && <p>Loading...</p>} {/* Afișăm mesajul de încărcare când datele sunt obținute */}
      {error && <p>{error}</p>} {/* Afișăm mesajul de eroare dacă ceva nu merge bine */}

      <div className="row">
        {travelOferts.map((ofert, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <OfertCard
              // image={ofert.image} // Presupunem că ai un câmp `image` în datele din backend
              price={ofert[0].pret} // Presupunem că ai un câmp `price` în datele din backend
              // location={ofert.location} // Presupunem că ai un câmp `location` în datele din backend
              description={ofert[0].descriere} // Presupunem că ai un câmp `description` în datele din backend
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertsList;
