import React from "react";

const CardZbor = ({ zbor }) => {
  const zborImages = {
    wizzair:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wizz_Air_logo.svg",
  };

  const getAirlineLogo = (companie) => {
    const companyKey = companie.toLowerCase();
    return zborImages[companyKey] || "https://via.placeholder.com/150";
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-light rounded">
        <img
          src={getAirlineLogo(zbor.companie)}
          className="card-img-top mx-auto mt-2"
          alt="Zbor"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "150px",
            margin: "0 auto",
          }}
        />
        <div className="card-body">
          <h5 className="card-title text-primary">{zbor.companie}</h5>
          <p className="card-text">
            <strong>Plecare:</strong> {zbor.localitatePlecare?.denumire} -{" "}
            {zbor.data_plecare}
          </p>
          <p className="card-text">
            <strong>Sosire:</strong> {zbor.localitateSosire?.denumire} -{" "}
            {zbor.data_sosire}
          </p>
          <p className="card-text">
            <strong>Clasa:</strong> {zbor.clasa}
          </p>
          <p className="card-text text-danger">
            <strong>Pret:</strong> {zbor.pret} Lei
          </p>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-primary">Cumpără</button>
        </div>
      </div>
    </div>
  );
};

export default CardZbor;
