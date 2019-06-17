import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Spin, Icon, Badge, Typography, Alert, Button, Input, Select,
} from 'antd';
import Footer from '../../components/footer';
import * as OrderAPI from '../../services/OrderAPI';

import './style.css';

const { Option } = Select;

class OrderFilter extends Component {
  state = {
    loading: true,
    orders: [],
    offset: 0,
    totalElements: 0,
    totalPages: 0,
    query: {
      size: 4,
      page: 0,
      sort: 'status,asc',
    },
  };

  async componentDidMount() {
    await this.loadData();
  }

  loadData = async (isQuery) => {
    const { query, orders } = this.state;
    if (isQuery) {
      query.page = 0;
    }

    const response = await OrderAPI.getAll(query);

    console.log(response);
    if (!response.status) {
      const {
        content,
        totalElements,
        pageable: { offset, pageNumber },
        totalPages,
      } = response;

      console.log(query.page);
      if (query.page === 0) {
        this.setState({ orders: content });
        query.page = 0;
      } else {
        query.page = pageNumber;
        this.setState({ orders: orders.concat(content) });
      }

      query.page = pageNumber;

      this.setState({
        totalElements,
        offset,
        query,
        totalPages,
      });
    }

    this.setState({ loading: false });
  };

  convertStatus = (status) => {
    if (status === 'APPROVED') {
      return { status: 'success', text: 'APROVADO' };
    }

    if (status === 'DENIED') {
      return { status: 'error', text: 'REPROVADO' };
    }

    return { status: 'warning', text: 'PENDENTE' };
  };

  render() {
    const {
      loading, orders, offset, totalElements, totalPages, query,
    } = this.state;
    const numberOffset = +offset ? +offset : 1;
    const numberElements = +totalElements - numberOffset;
    return (
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
            <h2>Verificação de solicitações</h2>
          </header>
          <main className="container-main filter">
            <div className="filter-infos">
              <Input.Search
                placeholder="Pesquisa por solicitante"
                className="my-5"
                onSearch={(value) => {
                  if (value) {
                    query.requester = value;
                  } else {
                    delete query.requester;
                  }

                  const newQuery = { page: 0, ...query };
                  const state = { query: newQuery, ...this.state };
                  this.setState(state, () => {
                    this.loadData('query');
                  });
                }}
              />
              <Input.Search
                placeholder="Pesquisa por produto"
                className="my-5"
                onSearch={(value) => {
                  if (value) {
                    query.product = value;
                  } else {
                    delete query.product;
                  }

                  const newQuery = { page: 0, ...query };
                  const state = { query: newQuery, ...this.state };
                  this.setState(state, () => {
                    this.loadData('query');
                  });
                }}
              />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Pesquisar por status"
                optionFilterProp="children"
                onChange={(value) => {
                  if (value) {
                    query.status = value;
                  } else {
                    delete query.status;
                  }

                  const newQuery = { page: 0, ...query };
                  const state = { query: newQuery, ...this.state };
                  this.setState(state, () => {
                    this.loadData('query');
                  });
                }}
              >
                <Option value="">SELECIONE</Option>
                <Option value="APPROVED">APROVADO</Option>
                <Option value="DENIED">REPROVADO</Option>
                <Option value="PENDING">PENDENTE</Option>
              </Select>
            </div>
            <div className="order-list my-5">
              {loading ? (
                <Spin size="large" indicator={<Icon type="loading" spin />} />
              ) : (
                orders.map(o => (
                  <div
                    key={o.id.toString()}
                    className="order-card box-shadow"
                    style={{ padding: 30, display: 'flex' }}
                  >
                    <div className="order-card-box">
                      <div className="order-status">
                        <Badge {...this.convertStatus(o.status)} />
                      </div>
                      <div className="order-info">
                        <Typography.Title className="requester" level={3}>
                          {o.requester}
                        </Typography.Title>
                        <div>
                          <Typography.Title level={4}>{o.product.description}</Typography.Title>
                          <p>
                            {`R$ ${o.product.price}`
                              .replace(/\./g, ',')
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          </p>
                        </div>
                      </div>
                    </div>
                    {o.status === 'DENIED' && (
                      <Alert message={o.note} type="error" style={{ maxWidth: 300 }} />
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="pagination text-center">
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                disabled={totalPages === query.page}
                onClick={() => {
                  query.page += 1;
                  this.setState({ query });
                  this.loadData();
                }}
              />
              {numberElements > 0 && <span>{`+ ${numberElements}`}</span>}
            </div>
          </main>
        </section>
        <Footer />
      </>
    );
  }
}
export default OrderFilter;
