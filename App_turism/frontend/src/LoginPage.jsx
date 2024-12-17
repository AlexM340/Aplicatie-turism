import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/**
 * LoginPage Component
 *
 * Această componentă reprezintă o pagină de autentificare pentru utilizatori
 *
 * @param {Function} props.onLogin - Funcția apelată pentru a efectua autentificarea utilizatorului.
 * @param {string} [props.errorMessage] - Mesajul de eroare care trebuie afișat (opțional).
 * @returns {JSX.Element} Pagina de autentificare redată ca structură JSX.
 */
const LoginPage = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && parola) {
      try {
        // Trimite cererea POST către backend pentru login
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: email, // Poate fi fie email, fie username
            parola: parola,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setLoginError(errorData.message || "Invalid credentials");
          return;
        }

        // Dacă login-ul a avut succes, salvați token-ul
        const data = await response.json();
        onLogin(data.token); // Apelează funcția de login cu token-ul
        alert("Login successful!");
        navigate("/dashboard"); // Redirecționează utilizatorul către pagina principală
      } catch (error) {
        setLoginError("An error occurred. Please try again.");
        console.error("Error during login:", error);
      }
    } else {
      setLoginError("Please fill in all fields.");
    }
  };

  return (
    <div className="text-center">
      <h2>Login to Your Account</h2>
      {loginError && <div className="alert alert-danger">{loginError}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-floating mb-2">
          <input
            type="text" //am pus text sa se poate da login si cu email
            id="username"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="username" className="form-label">
            Username or Email
          </label>
        </div>
        <div className="form-floating mb-2">
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
          Login
        </button>
      </form>
      <div className="mt-3">
        <p>
          New to the site?{" "}
          <Link to="/signup" className="btn btn-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
