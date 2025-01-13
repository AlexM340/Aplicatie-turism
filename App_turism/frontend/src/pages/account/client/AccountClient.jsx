import React, { useState } from "react";
import DetaliiContClient from "./DetaliiContClient";
import RezervariClient from "./RezervariClient";

const AccountClient = () => {
  const [changeView, setChangeView] = useState(0);
  return (
    <div className="d-flex">
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
            Contul meu
          </button>
          <button
            className="list-group-item list-group-item-action"
            onClick={() => setChangeView(2)}
          >
            Rezervarile mele
          </button>
        </div>
      </div>
      {changeView !== 0 &&
        (changeView === 1 ? (
          <DetaliiContClient />
        ) : changeView === 2 ? (
          <RezervariClient />
        ) : (
          <></>
        ))}
    </div>
  );
};

export default AccountClient;
