import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../Components/Navbar';
import Login from '../Components/LogIn';
import SignUp from '../Components/SignUp';
import { AuthProvider } from '../Components/Auth';
import Home from '../Components/Home';
import BooksPage from './BooksPage';
import AddBookPage from './AddBookPage';
import BookDetails from './BookDetails';
import Profile from '../Components/Profile';
import EditeProfile from '../Components/EditeProfile';
import PrivateRoute from '../Components/PrivateRoute';

function Main() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <>
            <div>
              <Route path="/Login" component={Login} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/Logout" component={Login} />
            </div>
            <div>
              <Navbar />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/Profile" component={Profile} />
              <PrivateRoute path="/Home" component={Home} />
              <PrivateRoute path="/Posts" component={BooksPage} />
              <PrivateRoute path="/Publish" component={AddBookPage} />
              <PrivateRoute path="/Details/:id" component={BookDetails} />
              <PrivateRoute path="/EditeProfile" component={EditeProfile} />
            </div>
          </>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default Main;
