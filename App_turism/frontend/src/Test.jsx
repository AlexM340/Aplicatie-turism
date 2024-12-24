import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage"; // Import the LoginPage component

const Test = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To programmatically navigate

  const handleLogin = (email, password) => {
    // Simulate login logic with multiple emails and passwords
    const validCredentials = [
      { email: "guest@test.com", password: "12345" },
      { email: "user@example.com", password: "password123" },
    ];

    const user = validCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (user) {
      onLogin(); // Notify parent to update the login state
      setErrorMessage("");
      navigate("/"); // Redirect to the Landing Page (Home)
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return <LoginPage/>;
};

export default Test;
