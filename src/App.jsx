import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { useMoralis } from 'react-moralis';

function App() {

  const { login, isAuthenticated, authenticate, Moralis } = useMoralis();

  return (
    <Router>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/auth/signin" />
      </Switch>
    </Router>
  )
}

export default App