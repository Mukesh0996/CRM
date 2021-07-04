import { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Contacts from './Pages/Contacts';
import Home from './Pages/Home';
import LeadsModule from './Pages/Leads';
import SignIn from './Pages/Signin';
import Signup from './Pages/Signup';
import Header from './Components/Header/Header';
import AddLead from './Components/Leads/AddLead';
import AuthContext from './Store/AuthContext';

function App() {

  const { isLoggedIn, orgId} = useContext(AuthContext);

  return (
      <Fragment>
        { isLoggedIn && <Header/> }
        <Switch>
          <Route path="/" exact> { !isLoggedIn ? <SignIn/> : <Redirect to={`/home/org/${orgId}`}/>}</Route>
          <Route path="/signup">
              <Signup/>
          </Route>
          <Route path="/home/org/:orgId"> { isLoggedIn ? <Home/> : <SignIn/>}</Route>
          <Route path="/leads/org/:orgId/" exact> { isLoggedIn ? <LeadsModule/> : <SignIn/> }</Route>
          <Route path="/leads/org/:orgId/add-lead" exact><AddLead/></Route>
          <Route path="/contacts/org/:orgId"> { isLoggedIn ? <Contacts/> : <SignIn/> } </Route>
          { <Route path="*" render={()=> <Redirect to="/"/>}/> }
        </Switch>
      </Fragment>
  );
}

export default App;
