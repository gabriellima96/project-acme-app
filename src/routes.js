import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import OrderRequest from './pages/orderRequest';

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/solicitante" component={OrderRequest} />
  </BrowserRouter>
);

export default Routes;
