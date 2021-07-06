import { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Contacts from './Pages/Contacts';
import Home from './Pages/Home';
import LeadsModule from './Pages/Leads';
import SignIn from './Pages/Signin';
import Signup from './Pages/Signup';
import Header from './Components/Header/Header';
import AddLead from './Components/Leads/AddLead';
import AuthContext from './Store/Auth/AuthContext';

function App() {

  const { isLoggedIn, orgId} = useContext(AuthContext);
  return (
      <Fragment>
        { isLoggedIn && <Header/> }
        <Switch>
          <Route path="/" exact> { !isLoggedIn ? <SignIn/> : <Redirect to={`/org/${orgId}/home`}/>}</Route>
          <Route path="/signup">
              <Signup/>
          </Route>
          <Route path="/org/:orgId/home"> { isLoggedIn ? <Home/> : <Redirect to={"/"}/>}</Route>
          <Route path="/org/:orgId/leads" exact> { isLoggedIn ? <LeadsModule/> : <Redirect to={`/`}/> }</Route>
          <Route path="/org/:orgId/leads/add-lead" exact>{ isLoggedIn ? <AddLead/> : <Redirect to={"/"}/> } </Route>
          <Route path="/org/:orgId/contacts"> { isLoggedIn ? <Contacts/> : <Redirect to={"/"}/> } </Route>
          { <Route path="*" render={()=> <Redirect to="/"/>}/> }
        </Switch>
      </Fragment>
  );
}

export default App;
