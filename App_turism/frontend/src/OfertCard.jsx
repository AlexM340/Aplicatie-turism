/**
 * OfertCard Component
 *
 * @description Un card care afișează informațiile despre un pachet turistic, inclusiv o imagine,
 * prețul, locația și o descriere. Conține și un buton pentru rezervare.
 *
 * @param {string} props.image - URL-ul imaginii asociate cu pachetul
 * @param {number|string} props.price - Prețul pachetului
 * @param {string} props.location - Locația pachetului
 * @param {string} props.description - Descrierea pachetului turistic
 *
 * @returns {JSX.Element} Un card stilizat cu imagine, informații și un buton.
 */
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
