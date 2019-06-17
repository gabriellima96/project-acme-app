import React, { Component } from 'react';
import {
  Spin, Icon, Badge, Typography, Alert, Button,
} from 'antd';
import Footer from '../../components/footer';
import * as OrderAPI from '../../services/OrderAPI';

import './style.css';

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

  loadData = async () => {
    const { query, orders } = this.state;
    const response = await OrderAPI.getAll(query);

    console.log(response);
    if (!response.status) {
      const {
        content,
        totalElements,
        pageable: { offset, pageNumber },
        totalPages,
      } = response;

      query.page = pageNumber;
      const newOrders = orders.concat(content);

      this.setState({
        orders: newOrders,
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

    return { status: 'warning', text: 'APROVADO' };
  };

  render() {
    const {
      loading, orders, offset, totalElements, totalPages, query,
    } = this.state;
    const numberElements = +totalElements - +offset;
    return (
      <>
        <header className="header">
          <h1>ACME</h1>
          <p>Plataforma de aprovação de fluxo de compras</p>
        </header>
        <section className="container">
          <header>
            <h2>Verificação de solicitações</h2>
          </header>
          <main className="container-main filter">
            <div className="filter-infos">
              <h1>Hello</h1>
            </div>
            <div className="order-list">
              {loading ? (
                <Spin size="large" indicator={<Icon type="loading" spin />} />
              ) : (
                orders.map(o => (
                  <div
                    key={o.id}
                    className="order-card box-shadow"
                    style={{ padding: 30, display: 'flex' }}
                  >
                    <div className="order-card-box">
                      <div className="order-status">
                        <Badge {...this.convertStatus(o.status)} />
                      </div>
                      <div className="order-info">
                        <Typography.Title className="requester" level={3}>
                          {o.product.requester}
                        </Typography.Title>
                        <div>
                          <Typography.Title level={4}>{o.product.description}</Typography.Title>
                          <p>{o.product.price}</p>
                        </div>
                      </div>
                    </div>
                    {o.status === 'DENIED' && <Alert message={o.note} type="error" />}
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
