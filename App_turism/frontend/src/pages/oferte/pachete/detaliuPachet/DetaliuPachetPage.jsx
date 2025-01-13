import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import { query } from "../../../../utils/query";
import { convertDateToISOString, formatData } from "../PachetePage";

const DetaliuPachetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["PachetDetails", id],
    queryFn: () => query(`api/pachete/${id}`, {}, "GET"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { camera, pret, data_checkin, data_checkout, zbor } = data;

  const handleClosePage = () => {
    navigate("/pachete");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmReservation = () => {
    setShowModal(false);
    alert(`Pachetul cu ID ${id} a fost rezervat cu succes!`);
  };

  return (
    <div className="container-fluid d-flex flex-column vh-100 p-0">
      <h1 className="text-center mb-4">{camera.cazare.nume}</h1>
      <div className="row flex-grow-1 m-0">
        <div className="col-md-6 p-0">
          <img
            src={
              "https://images.pexels.com/photos/5227434/pexels-photo-5227434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt={camera.cazare.nume}
            style={{
              width: "100%",
              height: "90vh",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-6 d-flex flex-column">
          <div className="flex-grow-1 overflow-auto p-4">
            <Card className="mb-4 shadow-sm rounded">
              <Card.Header>
                <h4>Informații Pachet</h4>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Preț:</strong> {pret}€
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Localitate:</strong>{" "}
                  {camera.cazare.localitate.denumire}
                </ListGroup.Item>
              </ListGroup>
            </Card>

            <Card className="mb-4 shadow-sm rounded">
              <Card.Header>
                <h4>Detalii Cazare</h4>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Tip cameră:</strong> {camera.descriere}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Preț cameră/noapte:</strong> {camera.pret}€
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Check-in:</strong>{" "}
                  {formatData(new Date(data_checkin))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Check-out:</strong>{" "}
                  {formatData(new Date(data_checkout))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Numar nopti</strong>{" "}
                  {Math.ceil(
                    (new Date(data_checkout).getTime() -
                      new Date(data_checkin).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Număr maxim de persoane:</strong> {camera.nr_persoane}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Descriere cazare:</strong> {camera.cazare.descriere}
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {zbor && (
              <Card className="mb-4 shadow-sm rounded">
                <Card.Header>
                  <h4>Detalii Zbor</h4>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Companie Zbor:</strong> {zbor.companie}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Data Plecare:</strong>{" "}
                    {convertDateToISOString(zbor.data_plecare).slice(0, 10)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Ora Plecare:</strong>{" "}
                    {formatData(new Date(zbor.data_plecare)).slice(11, 19)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Aeroport Plecare:</strong> {zbor.aeroport_plecare}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Preț Zbor:</strong> {zbor.pret}€
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            )}
          </div>

          <div
            className="d-flex justify-content-end p-4"
            style={{ marginTop: "auto", marginBottom: "90px" }}
          >
            <button
              onClick={handleOpenModal}
              className="btn btn-success me-2"
              style={{ padding: "10px 20px" }}
            >
              Rezervă
            </button>
            <button
              onClick={handleClosePage}
              className="btn btn-primary"
              style={{ padding: "10px 20px" }}
            >
              Închide
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmare Rezervare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ești sigur că vrei să rezervi acest pachet pentru {camera.cazare.nume}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Anulează
          </Button>
          <Button variant="success" onClick={handleConfirmReservation}>
            Confirmă Rezervarea
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetaliuPachetPage;
