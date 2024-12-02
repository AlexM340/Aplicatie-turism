import  { useState } from "react";
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
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
    navigate("/");
  };

  return (
    <div className="text-center">
      <h2>Login to Your Account</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
