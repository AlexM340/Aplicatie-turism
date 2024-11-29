import React, { useState } from "react";
import Pages from "./Pages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignUp = ({ name, email, password }) => {
    console.log("New user signed up:", { name, email, password });
    setIsLoggedIn(true);
  };

  return (
    <>
      <Pages
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSignUp={handleSignUp}
      />
    </>
  );
}

export default App;
