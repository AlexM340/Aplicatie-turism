import React from "react";

const OfertCard = ({
  image,
  price,
  hotelName,
  location,
  description,
  handleClick,
  buttonText = "Rezervă",
  priceText = "Preț",
  checkInDate,
  checkOutDate,
}) => {
  return (
    <div
      className="card"
      style={{
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        padding: "16px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <img
        src={image}
        alt={location}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div
        className="ms-3"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h5 className="card-title" style={{ marginBottom: "8px" }}>
          {hotelName}
        </h5>
        <p className="card-text" style={{ flexGrow: 1, marginBottom: "8px" }}>
          {location}
        </p>
        <p className="card-text" style={{ flexGrow: 1, marginBottom: "8px" }}>
          {description}
        </p>
        <p className="text-muted" style={{ marginBottom: "8px" }}>
          {priceText}: {price}€
        </p>
      </div>

      {(checkInDate || checkOutDate) && (
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#555" }}>
          {checkInDate && (
            <p style={{ margin: 0 }}>
              <strong>Check-in:</strong> {checkInDate}
            </p>
          )}
          {checkOutDate && (
            <p style={{ margin: 0 }}>
              <strong>Check-out:</strong> {checkOutDate}
            </p>
          )}
        </div>
      )}
      <button
        onClick={() => handleClick(location)}
        className="btn btn-primary"
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          backgroundColor: "#007BFF",
          border: "none",
          borderRadius: "5px",
          padding: "8px 12px",
          fontSize: "14px",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default OfertCard;