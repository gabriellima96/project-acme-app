import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';

import './style.css';

const Home = () => (
  <>
    <header className="header">
      <h1>ACME</h1>
      <p>Plataforma de aprovação de fluxo de compras</p>
    </header>
    <section className="container">
      <header>
        <h2>Você deseja entrar como?</h2>
      </header>
      <main className="container-main">
        <ul>
          <li>
            <Link to="/solicitante" className="button button-outline block">
              <span>Solicitante</span>
            </Link>
          </li>
          <li>
            <Link to="/administrativo" className="button button-outline my-5 block">
              <span>Administrativo</span>
            </Link>
          </li>
          <li>
            <Link to="/almoxarife" className="button button-outline block">
              <span>Almoxarife</span>
            </Link>
          </li>
        </ul>
      </main>
    </section>
    <Footer />
  </>
);

export default Home;
