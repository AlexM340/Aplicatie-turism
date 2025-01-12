import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "./query"; // Funcția custom pentru API calls
import { formatData } from "./PachetePage";

const ZboruriAngajat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newZbor, setNewZbor] = useState({
    localitatePlecare: { id: 0, denumire: "" },
    localitateSosire: { id: 0, denumire: "" },
    id_tara_plecare: 0,
    id_tara_sosire: 0,
    data_plecare: "",
    data_sosire: "",
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
  const {
    data: localitati,
    isLoading: isLoadingLocalitati,
  } = useQuery({
    queryKey: ["Localitati"],
    queryFn: () => query("api/orase", undefined, "GET"),
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
                  <select
                    id="localitatePlecare"
                    className="form-control"
                    value={newZbor.localitatePlecare?.id}
                    onChange={(e) => {
                      const selectedLocalitate = localitati.find(
                        (localitate) => localitate.id === +e.target.value
                      );
                      setNewZbor({
                        ...newZbor,
                        localitatePlecare: {
                          id: selectedLocalitate.id,
                          denumire: selectedLocalitate.denumire,
                        },
                        id_tara_plecare: selectedLocalitate.id_tara,
                      });
                    }}
                  >
                    <option value="">Selectați cazarea</option>
                    {!isLoadingLocalitati &&
                      localitati?.map((localitate) => (
                        <option key={localitate.id} value={localitate.id}>
                          {localitate.denumire}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="destinatie">Destinație</label>
                  <select
                    id="localitateSosire"
                    className="form-control"
                    value={newZbor.localitateSosire?.id}
                    onChange={(e) => {
                      const selectedLocalitate = localitati.find(
                        (cazare) => cazare.id === +e.target.value
                      );
                      setNewZbor({
                        ...newZbor,
                        localitateSosire: {
                          id: selectedLocalitate.id,
                          denumire: selectedLocalitate.denumire,
                        },
                        id_tara_sosire: selectedLocalitate.id_tara,
                      });
                    }}
                  >
                    <option value="">Selectați cazarea</option>
                    {!isLoadingLocalitati &&
                      localitati?.map((localitate) => (
                        <option key={localitate.id} value={localitate.id}>
                          {localitate.denumire}
                        </option>
                      ))}
                  </select>
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
                  <label htmlFor="data_intoarcere">Data Sosire</label>
                  <input
                    type="datetime-local"
                    id="data_intoarcere"
                    className="form-control"
                    value={newZbor.data_sosire}
                    onChange={(e) =>
                      setNewZbor({
                        ...newZbor,
                        data_sosire: e.target.value,
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
                <div className="form-group">
                  <label htmlFor="pret">Companie</label>
                  <input
                    id="pret"
                    className="form-control"
                    value={newZbor.companie}
                    onChange={(e) =>
                      setNewZbor({ ...newZbor, companie: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pret">Clasa</label>
                  <input
                    id="pret"
                    className="form-control"
                    value={newZbor.clasa}
                    onChange={(e) =>
                      setNewZbor({ ...newZbor, clasa: e.target.value })
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
