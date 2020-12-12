import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../Pages/SignIn';
import Dashboard from '../Pages/Dashboard';
import SignUp from '../Pages/SignUp';
import Votar from '../Pages/Votar'
import CriarRecurso from '../Pages/CriarRecurso';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/signup" component={SignUp} />
      <Route path="/votar/:id" component={Votar} />
      <Route path="/criarrecurso" component={CriarRecurso} />
    </Switch>
  );
};

export default Routes;
