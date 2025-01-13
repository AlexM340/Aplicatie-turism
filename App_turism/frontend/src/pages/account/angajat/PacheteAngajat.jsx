import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { query } from "../../../utils/query";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { convertDateToISOString, formatData } from "../../oferte/pachete/PachetePage";

const PacheteAngajat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPachet, setNewPachet] = useState({
    zbor: { id: 0, denumire: "" },
    cazare: { id: 0, denumire: "" },
    data_checkin: new Date(),
    data_checkout: new Date(),
  });
  console.log(newPachet);
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["PachetePage"],
    queryFn: () => query("api/getPachete", undefined, "GET"),
  });

  const { data: cazari, isLoading: isLoadingCazari } = useQuery({
    queryKey: ["Cazari"],
    queryFn: () => query("api/getCazare", undefined, "GET"),
  });
  const { data: zboruri, isLoading: isLoadingZboruri } = useQuery({
    queryKey: ["Zboruri"],
    queryFn: () => query("api/getZboruri", undefined, "GET"),
  });

  const handleAddPachet = async () => {
    try {
      await query("api/addPachet", { ...newPachet }, "POST"); // Call the API to add the package
      refetch(); // Refresh the data after adding a new package
      setIsOpen(false); // Close the modal
      setNewPachet({ zbor: "", locatie: "", pret: "", data_checkout: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding pachet:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Pachete turistice</h1>
      <Button className="btn btn-primary my-3" onClick={() => setIsOpen(true)}>
        Adaugă
      </Button>

      {!isLoading && !isRefetching ? (
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>Cazare</th>
                <th>Locație</th>
                <th>Preț</th>
                <th>Descriere</th>
                <th>Data check-in</th>
                <th>Data check-out</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((pachet, index) => (
                <tr key={index}>
                  <td>{pachet.camera.cazare.nume}</td>
                  <td>{pachet.camera.cazare.localitate.denumire}</td>
                  <td>{pachet.pret}</td>
                  <td>{pachet.camera.cazare.descriere}</td>
                  <td>{formatData(new Date(pachet.data_checkin))}</td>
                  <td>{formatData(new Date(pachet.data_checkout))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adaugă Pachet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="cazare">Cazare</label>
              <select
                id="cazare"
                className="form-control"
                value={newPachet.cazare?.id}
                onChange={(e) => {
                  const selectedCazare = cazari.find(
                    (cazare) => cazare.id === parseInt(e.target.value)
                  );
                  setNewPachet({
                    ...newPachet,
                    cazare: {
                      id: selectedCazare.id,
                      denumire: selectedCazare.nume,
                    },
                  });
                }}
              >
                <option value="">Selectați cazarea</option>
                {!isLoadingCazari &&
                  cazari?.map((cazare) => (
                    <option key={cazare.id} value={cazare.id}>
                      {cazare.nume}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="locatie">Zbor</label>
              <select
                id="zbor"
                className="form-control"
                value={newPachet.zbor.id}
                onChange={(e) => {
                  const zborSelected = zboruri.find((zbor)=>zbor.id===+e.target.value)
                  setNewPachet({ ...newPachet, zbor: zborSelected });
                }}
              >
                <option value="">Selectați zborul</option>
                {!isLoadingCazari &&
                  zboruri?.map((zbor) => (
                    <option key={zbor.id} value={zbor.id}>
                      {zbor.localitatePlecare.denumire}-
                      {zbor.localitateSosire.denumire} {zbor.data_plecare}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pret">Data checkin</label>
              <input
                type="date"
                id="pret"
                className="form-control"
                value={convertDateToISOString(new Date(newPachet.data_checkin))}
                onChange={(e) =>
                  setNewPachet({ ...newPachet, data_checkin: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriere">Data checkout</label>
              <input
                type="date"
                id="descriere"
                className="form-control"
                value={convertDateToISOString(
                  new Date(newPachet.data_checkout)
                )}
                onChange={(e) =>
                  setNewPachet({ ...newPachet, data_checkout: e.target.value })
                }
              ></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Închide
          </Button>
          <Button variant="primary" onClick={handleAddPachet}>
            Adaugă
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PacheteAngajat;
