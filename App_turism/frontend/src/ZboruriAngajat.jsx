import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "./query"; // Funcția custom pentru API calls
import { formatData } from "./PachetePage";

const ZboruriAngajat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newZbor, setNewZbor] = useState({
    plecare: "",
    destinatie: "",
    data_plecare: "",
    data_intoarcere: "",
    pret: "",
  });

  // Fetch existing zboruri
  const {
    data: zboruri,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ZboruriPage"],
    queryFn: () => query("api/getZboruri", undefined, "GET"),
  });

  // Add new zbor
  const handleAddZbor = async () => {
    try {
      await query("api/addZbor", newZbor, "POST");
      refetch(); // Refresh the list of zboruri
      setIsModalOpen(false); // Close the modal
    } catch (err) {
      console.error("Failed to add zbor:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Zboruri</h1>
      <button
        className="btn btn-primary my-3"
        onClick={() => setIsModalOpen(true)}
      >
        Adaugă Zbor
      </button>

      {/* Table for displaying zboruri */}
      {!isLoading ? (
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Plecare</th>
                <th>Destinație</th>
                <th>Data Plecare</th>
                <th>Data Întoarcere</th>
                <th>Preț</th>
              </tr>
            </thead>
            <tbody>
              {zboruri?.map((zbor, index) => (
                <tr key={index}>
                  <td>{zbor.localitatePlecare.denumire}</td>
                  <td>{zbor.localitateSosire.denumire}</td>
                  <td>{formatData(new Date(zbor.data_plecare))}</td>
                  <td>{formatData(new Date(zbor.data_sosire))}</td>
                  <td>{zbor.pret}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* Modal for adding a new zbor */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adaugă Zbor</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="plecare">Plecare</label>
                  <input
                    type="text"
                    id="plecare"
                    className="form-control"
                    value={newZbor.plecare}
                    onChange={(e) =>
                      setNewZbor({ ...newZbor, plecare: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="destinatie">Destinație</label>
                  <input
                    type="text"
                    id="destinatie"
                    className="form-control"
                    value={newZbor.destinatie}
                    onChange={(e) =>
                      setNewZbor({ ...newZbor, destinatie: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="data_plecare">Data Plecare</label>
                  <input
                    type="datetime-local"
                    id="data_plecare"
                    className="form-control"
                    value={newZbor.data_plecare}
                    onChange={(e) =>
                      setNewZbor({ ...newZbor, data_plecare: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="data_intoarcere">Data Întoarcere</label>
                  <input
                    type="datetime-local"
                    id="data_intoarcere"
                    className="form-control"
                    value={newZbor.data_intoarcere}
                    onChange={(e) =>
                      setNewZbor({
                        ...newZbor,
                        data_intoarcere: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pret">Preț</label>
                  <input
                    type="number"
                    id="pret"
                    className="form-control"
                    value={newZbor.pret}
                    onChange={(e) =>
                      setNewZbor({ ...newZbor, pret: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Închide
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddZbor}
                >
                  Adaugă Zbor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZboruriAngajat;
