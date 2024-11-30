import React from "react";

const OfertCard = ({ image, price, location, description }) => {
  return (
    <div className="card h-100">
      <img
        src={image}
        className="card-img-top"
        alt={location}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{location}</h5>
        <p className="card-text">{description}</p>
        <p className="text-muted mt-auto">Price: ${price}</p>
        <a href="#" className="btn btn-primary">
          Book Now
        </a>
      </div>
    </div>
  );
};

export default OfertCard;
