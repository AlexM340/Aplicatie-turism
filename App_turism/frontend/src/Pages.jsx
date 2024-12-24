import React, { Suspense } from "react";
import LandingPage from "./LandingPage";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Test from "./Test";
import SignUpPage from "./SignupPage";
import LoginPage from "./LoginPage";

const Pages = () => {
  const Pages = [
    {
      path: "home",
      component: LandingPage,
    },
    {
      path: "test",
      component: LandingPage,
    },
    {
      path: "oferte",
      component: LandingPage,
    },
    {
      path: "pachete",
      component: LandingPage,
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route index element={<LandingPage />} />
          {Pages.map((route, index) => (
            <Route
              key={index}
              path={`/${route.path}`}
              element={<route.component />}
            />
          ))}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};

export default Pages;
