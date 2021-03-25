import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';

function Routes() {
  const [userData, setUserData] = useContext(UserContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        {userData.isLogged ? 
          <Route path='/dashboard' exact component={Dashboard} /> :
          <Redirect from='/dashboard' to='/' />
        }
        
      </Switch>

    </BrowserRouter>
  )
}

export default Routes