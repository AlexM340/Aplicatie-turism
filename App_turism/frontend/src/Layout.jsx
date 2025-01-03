import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap"; // Ensure you have react-bootstrap installed
import { User, useUser } from "./UserComponent";

const Layout = () => {
  const { user, setUser } = useUser();
  console.log(user);
  return (
    <>
      <aside className="bg-dark text-white">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src="/logoTurism.png"
                alt="Tourism App Logo"
                style={{ width: "40px", height: "auto" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                {!user.client.id ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Guest
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/account">
                          Account
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => [user.logout(), setUser(new User())]}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main>
        <div className="container-fluid px-5 py-2">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
