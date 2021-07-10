import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Login from './LogInPage';
import SignUp from './SignUpPage';
import { AuthProvider } from '../Components/Auth';
import Home from '../Components/Home';
import BooksPage from './BooksPage';
import AddBookPage from './AddBookPage';
import BookDetails from './BookDetails';
import EditeProfile from '../Components/EditeProfile';
import PrivateRoute from '../Components/PrivateRoute';
import ProfilePage from './ProfilePage';
import WishList from '../Components/WishList';
import Intrests from '../Components/Intrests';
function Main() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <>
            <div>
              <Route path='/Login' component={Login} />
              <Route path='/SignUp' component={SignUp} />
              <Route path='/Logout' component={Login} />
              <Route path='/Intrests' component={Intrests} />
            </div>
            <div>
              <Navbar />
              <PrivateRoute path='/' exact component={Home} />
              <PrivateRoute path='/Home' component={Home} />
              <PrivateRoute path='/Posts' component={BooksPage} />
              <PrivateRoute path='/Publish' component={AddBookPage} />
              <PrivateRoute path='/Details/:id' component={BookDetails} />
              <PrivateRoute path='/EditeProfile' component={EditeProfile} />
              <PrivateRoute
                path='/UserProfile/:UserId'
                component={ProfilePage}
              />
              <PrivateRoute path='/WishList' component={WishList} />
            </div>
          </>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default Main;
