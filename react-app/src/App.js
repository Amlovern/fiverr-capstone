import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import MainNavBar from './components/MainNavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SplashPage from './components/SplashPage';
import GigDetail from './components/GigDetail';
import AddGigForm from './components/AddGigForm';
import UpdateGigForm from './components/UpdateGigForm';
import AddOrderForm from './components/AddOrderForm';
import { authenticate } from './store/session';

import * as categoryActions from './store/category'

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();

    // Eager load Categories
    dispatch(categoryActions.getAllCategoriesThunk()).catch((res) => console.log(res));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <MainNavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <ProtectedRoute path='/gigs/new' exact={true} >
          <AddGigForm />
        </ProtectedRoute>
        <ProtectedRoute path='/gigs/:gigId/update' exact={true}>
          <UpdateGigForm />
        </ProtectedRoute>
        <ProtectedRoute path='/gigs/:gigId/new-order' exact={true}>
          <AddOrderForm />
        </ProtectedRoute>
        <Route path='/gigs/:gigId' >
          <GigDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
