import React from 'react';
import Footer from '../../components/footer';
import OrderForm from '../../components/orderForm';

const OrderRequest = () => (
  <>
    <header className="header">
      <h1>ACME</h1>
      <p>Plataforma de aprovação de fluxo de compras</p>
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
