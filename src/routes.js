import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import OrderRequest from './pages/orderRequest';
import OrderFilter from './pages/orderFilter';

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/solicitante" component={OrderRequest} />
    <Route path="/administrativo" component={OrderFilter} />
  </BrowserRouter>
);

export default Routes;
