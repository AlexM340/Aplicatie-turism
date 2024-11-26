import React, { Suspense } from "react";
import LandingPage from "./LandingPage";
import { Route, Routes } from "react-router-dom";
import Test from "./Test";
import Layout from "./Layout";

const Pages = () => {
  const Pages = [
    {
      path: "home",
      component: LandingPage,
    },
    {
      path: "test",
      component: Test,
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
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          {Pages.map((route, index) => (
            <Route
              key={index}
              path={`/${route.path}`}
              element={<route.component />}
            />
          ))}
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Suspense>
  );
};

export default Pages;
