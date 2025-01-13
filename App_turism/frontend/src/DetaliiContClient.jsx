import React, { useState } from "react";
import { useUser } from "./UserComponent";
import { useQuery, useMutation } from "@tanstack/react-query";
import { query } from "./query";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const DetaliiContClient = () => {
  const { user } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    nume: "",
    email: "",
    telefon: "",
    adresa: "",
    cnp: "",
  });

  // Fetch user details
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["DetaliiContClient", user?.user?.id],
    queryFn: () => query(`api/clienti/${user?.user?.id}`, {}, "GET"),
    enabled: !!user?.user?.id,
    refetchOnWindowFocus: false,
  });

  const handleEditClick = () => {
    setFormData({
      nume: data.nume || "",
      cnp: data.clienti_detalii.cnp || "",
      email: data.email || "",
      telefon: data.clienti_detalii.telefon || "",
      adresa: data.clienti_detalii.adresa || "",
    });
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      await query(`api/clienti/${user?.user?.id}`, formData, "PUT");
      setShowEditModal(false);
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <Alert variant="danger">Eroare la încărcarea detaliilor.</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Detalii Cont Client</h2>
      <div className="card">
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Nume:</strong> {data.nume}
            </li>
            <li className="list-group-item">
              <strong>Cnp:</strong> {data.clienti_detalii.cnp}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {data.email}
            </li>
            <li className="list-group-item">
              <strong>Telefon:</strong> {data.clienti_detalii.telefon}
            </li>
            <li className="list-group-item">
              <strong>Adresă:</strong> {data.clienti_detalii.adresa}
            </li>
          </ul>
          <div className="mt-3 text-center">
            <Button variant="primary" onClick={handleEditClick}>
              Editează Detalii
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Editing User Details */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editează Detalii</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNume">
                <Form.Label>Nume</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nume}
                  onChange={(e) =>
                    setFormData({ ...formData, nume: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formNume">
                <Form.Label>Cnp</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.cnp}
                  onChange={(e) =>
                    setFormData({ ...formData, cnp: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formTelefon" className="mt-3">
                <Form.Label>Telefon</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.telefon}
                  onChange={(e) =>
                    setFormData({ ...formData, telefon: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAdresa" className="mt-3">
                <Form.Label>Adresă</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.adresa}
                  onChange={(e) =>
                    setFormData({ ...formData, adresa: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Închide
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Salvează
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DetaliiContClient;
