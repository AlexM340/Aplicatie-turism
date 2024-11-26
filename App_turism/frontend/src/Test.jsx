import React, { useState } from "react";

const Test = () => {
  const [message, setMessage] = useState("");
  const handleClick = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/test"); // Replace with your backend URL if different
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error connecting to the backend");
    }
  };
  return (
    <>
      <div>Salut</div>
      <button onClick={handleClick}>test backend</button>
      {message && <div>{message}</div>}
    </>
  );
};

export default Test;
