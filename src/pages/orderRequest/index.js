import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import OrderForm from '../../components/orderForm';

const OrderRequest = () => (
  <>
    <header className="header">
      <h1>
        <Link to="/">ACME</Link>
      </h1>
      <p>Plataforma de aprovação de fluxo de compras</p>
      <nav>
        <ul>
          <li>
            <Link to="/solicitante">Solicitante</Link>
          </li>
          <li>
            <Link to="/administrativo">Administrativo</Link>
          </li>
          <li>
            <Link to="/almoxarife">Almoxarife</Link>
          </li>
        </ul>
      </nav>
    </header>
    <section className="container">
      <header>
        <h2>Qual produto você deseja solicita?</h2>
      </header>
      <OrderForm />
    </section>
    <Footer />
  </>
);

export default OrderRequest;
