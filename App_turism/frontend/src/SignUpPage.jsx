import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState('');  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (username && name && email && parola) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            email,
            parola,
          }),
        });

        if (!response.ok) {
          // Gestionare erori de la server
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Sign up failed");
          return;
        }

        // Dacă înregistrarea are succes
        const data = await response.json();
        alert("Sign up successful!");
        navigate("/"); // Redirecționează utilizatorul
      } catch (error) {
        // Gestionare erori de rețea sau de cod
        setErrorMessage("An error occurred. Please try again.");
        console.error("Error during signup:", error);
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="text-center">
      <h2>Create a New Account</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSignUp} className="mt-4">
        <div className="form-floating mb-3">
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username" className="form-label">
            Username
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            id="password"
            className="form-control"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
