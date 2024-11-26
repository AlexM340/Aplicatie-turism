import React from "react";
import LandingPage from "./LandingPage";
import { Route, Routes } from "react-router-dom";

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
    <Routes>
      <Route path="/" element={<LandingPage/>}>
        {Pages.map((route, index) => (
          <Route
            key={index}
            path={`/${route.path}`}
            element={<route.component />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Pages;
