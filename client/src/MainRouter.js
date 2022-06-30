import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./user/Login";
import Profile from "./user/Profile";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:userId" component={Profile} />
        <Route exact path="*" component={Home} />
      </Switch>
    </>
  );
};

export default MainRouter;
