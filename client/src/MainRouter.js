import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import store from "./redux/store";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import setAuthToken from "./helpers/setAuthToken";
import * as app from "./components";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<app.HomePage />} />
        <Route exact path="/login" element={<app.LoginPage />} />
        <Route exact path="/register" element={<app.RegisterPage />} />
        <Route
          exact path="/profile"
          element={
            <app.PrivateRoute>
              <app.ProfilePage />
            </app.PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default MainRouter;