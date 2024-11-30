import React from "react";
import OfertCard from "./OfertCard";

const OfertsList = () => {
  const travelOferts = [
    {
      image:
        "https://images.pexels.com/photos/705773/pexels-photo-705773.jpeg?auto=compress&cs=tinysrgb&w=800/300x200",
      price: 499,
      location: "Paris, France",
      description:
        "Enjoy the city of love with beautiful sights and delicious food.",
    },
    {
      image:
        "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=800/300x200",
      price: 799,
      location: "Tokyo, Japan",
      description: "Explore the vibrant cityscapes and rich cultural heritage.",
    },
    {
      image:
        "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=800/300x200",
      price: 299,
      location: "Bali, Indonesia",
      description:
        "Relax on the pristine beaches and experience tropical paradise.",
    },
    {
      image:
        "https://images.pexels.com/photos/949406/pexels-photo-949406.jpeg?auto=compress&cs=tinysrgb&w=800/300x200",
      price: 399,
      location: "New York, USA",
      description: "Experience the hustle and bustle of the Big Apple.",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {travelOferts.map((ofert, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <OfertCard
              image={ofert.image}
              price={ofert.price}
              location={ofert.location}
              description={ofert.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertsList;
