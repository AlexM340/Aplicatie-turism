import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "../../../utils/query";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CazareAngajat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCazare, setNewCazare] = useState({
    nume: "",
    telefon: "",
    descriere: "",
    localitate: { id: 0, denumire: "" },
    tara: { id: 0, denumire: "" },
  });

  const {
    data: cazari,
    isLoading: isLoadingCazari,
    refetch,
  } = useQuery({
    queryKey: ["Cazari"],
    queryFn: () => query("api/getCazareAngajat", undefined, "GET"),
  });

  const { data: tari, isLoading: isLoadingTari } = useQuery({
    queryKey: ["Tari"],
    queryFn: () => query("api/tari", undefined, "GET"),
  });
  const { data: localitati, isLoading: isLoadingLocalitati } = useQuery({
    queryKey: ["Localitati", newCazare.tara.id],
    queryFn: () =>
      query("api/getLocalitati", { id_tara: newCazare.tara.id }, "POST"),
  });

  const handleAddCazare = async () => {
    try {
      const payload = {
        nume: newCazare.nume,
        telefon: newCazare.telefon,
        descriere: newCazare.descriere,
        localitate_id: newCazare.localitate.id,
        id_tara: newCazare.tara.id,
      };

      await query("api/addCazare", payload, "POST");
      setIsOpen(false);
      setNewCazare({
        nume: "",
        telefon: "",
        descriere: "",
        localitate: { id: 0, denumire: "" },
        tara: { id: 0, denumire: "" },
      });
      refetch();
    } catch (error) {
      console.error("Error adding cazare:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Cazări disponibile</h1>
      <Button className="btn btn-primary my-3" onClick={() => setIsOpen(true)}>
        Adaugă cazare
      </Button>

      {!isLoadingCazari ? (
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Telefon</th>
                <th>Descriere</th>
                <th>Localitate</th>
              </tr>
            </thead>
            <tbody>
              {cazari?.map((cazare, index) => (
                <tr key={index}>
                  <td>{cazare.nume}</td>
                  <td>{cazare.telefon}</td>
                  <td>{cazare.descriere}</td>
                  <td>{cazare.localitate?.denumire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {isOpen && (
        <Modal show={isOpen} onHide={() => setIsOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Adaugă cazare</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="nume">Nume cazare</label>
                <input
                  type="text"
                  id="nume"
                  className="form-control"
                  value={newCazare.nume}
                  onChange={(e) =>
                    setNewCazare({ ...newCazare, nume: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefon">Telefon</label>
                <input
                  type="text"
                  id="telefon"
                  className="form-control"
                  value={newCazare.telefon}
                  onChange={(e) =>
                    setNewCazare({ ...newCazare, telefon: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="descriere">Descriere</label>
                <textarea
                  id="descriere"
                  className="form-control"
                  rows={3}
                  value={newCazare.descriere}
                  onChange={(e) =>
                    setNewCazare({ ...newCazare, descriere: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="tara">Tara</label>
                <select
                  id="tara"
                  className="form-control"
                  value={newCazare.tara.id}
                  onChange={(e) => {
                    const selectedTara = tari.find(
                      (tara) => tara.id === parseInt(e.target.value)
                    );
                    setNewCazare({
                      ...newCazare,
                      tara: {
                        id: selectedTara.id,
                        denumire: selectedTara.denumire,
                      },
                    });
                  }}
                >
                  <option value="">Selectați localitatea</option>
                  {!isLoadingLocalitati &&
                    tari?.map((tara) => (
                      <option key={tara.id} value={tara.id}>
                        {tara.denumire}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="localitate">Localitate</label>
                <select
                  id="localitate"
                  className="form-control"
                  value={newCazare.localitate.id}
                  disabled={!newCazare.tara.id}
                  onChange={(e) => {
                    const selectedLocalitate = localitati.find(
                      (loc) => loc.id === parseInt(e.target.value)
                    );
                    setNewCazare({
                      ...newCazare,
                      localitate: {
                        id: selectedLocalitate.id,
                        denumire: selectedLocalitate.denumire,
                      },
                    });
                  }}
                >
                  <option value={0}>Selectați localitatea</option>
                  {!isLoadingLocalitati &&
                    localitati?.map((localitate) => (
                      <option key={localitate.id} value={localitate.id}>
                        {localitate.denumire}
                      </option>
                    ))}
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Închide
            </Button>
            <Button variant="primary" onClick={handleAddCazare}>
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CazareAngajat;
