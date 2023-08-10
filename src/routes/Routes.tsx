import React from 'react';
import { Routes as DomRoutes, Route } from 'react-router-dom';
import { APP_ROUTES } from './RoutePaths';
import Home from '../components/home/Home';
import Header from '../components/header/Header';
import Favoriots from '../components/favoriots/Favoriots';

const Routes = () => {
  return (
    <>
      <Header />
      <DomRoutes>
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        <Route path={APP_ROUTES.FAVORIOTS} element={<Favoriots />} />
      </DomRoutes>
    </>
  );
};

export default Routes;
