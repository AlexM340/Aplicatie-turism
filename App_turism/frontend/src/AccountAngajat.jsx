import React, { useState } from "react";
import PacheteAngajat from "./PacheteAngajat";
import ZboruriAngajat from "./ZboruriAngajat";

const AccountAngajat = () => {
  const [changeView, setChangeView] = useState(0);
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className=" border-right"
        id="sidebar-wrapper"
        style={{ width: "250px", height: "100vh" }}
      >
        <div className="list-group list-group-flush">
          <button
            className="list-group-item list-group-item-action"
            onClick={() => setChangeView(1)}
          >
            Pachete
          </button>
          <button
            className="list-group-item list-group-item-action"
            onClick={() => setChangeView(2)}
          >
            Cazare
          </button>
          <button
            className="list-group-item list-group-item-action"
            onClick={() => setChangeView(3)}
          >
            Zboruri
          </button>
          <button className="list-group-item list-group-item-action">
            Rapoarte
          </button>
        </div>
      </div>
      {changeView !== 0 &&
        (changeView === 1 ? (
          <PacheteAngajat />
        ) : changeView === 2 ? (
          <CazareAngajat />
        ) : changeView === 3 ? (
          <ZboruriAngajat />
        ) : (
          <Rapoarte />
        ))}
    </div>
  );
};

export default AccountAngajat;
