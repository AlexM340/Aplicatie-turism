import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { query } from "./query";
import { convertDateToISOString } from "./PachetePage";

const PachetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["PachetDetails", id],
    queryFn: () => query(`api/pachete/${id}`, {}, "GET"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { camera, pret, data_checkin, data_checkout } = data;

  const handleClose = () => {
    navigate("/pachete");
  };

  return (
    <div className="container mt-4">
      <h1>{camera.cazare.nume}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://images.pexels.com/photos/5227434/pexels-photo-5227434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt={camera.cazare.nume}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-6">
          <p>
            <strong>Descriere:</strong> {camera.cazare.descriere}
          </p>
          <p>
            <strong>Localitate:</strong> {camera.cazare.localitate.denumire}
          </p>
          <p>
            <strong>Preț:</strong> {pret}€
          </p>
          <p>
            <strong>Check-in:</strong> {convertDateToISOString(data_checkin)}
          </p>
          <p>
            <strong>Check-out:</strong> {convertDateToISOString(data_checkout)}
          </p>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="btn btn-primary position-absolute"
        style={{
          bottom: "20px",
          right: "20px",
        }}
      >
        Închide
      </button>
    </div>
  );
};

export default PachetDetailsPage;
