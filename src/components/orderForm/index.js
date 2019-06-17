import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, Button, InputNumber, Row, Col, Alert,
} from 'antd';

import * as OrderAPI from '../../services/OrderAPI';

class OrderForm extends Component {
  state = {
    message: '',
    type: '',
    loading: false,
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { form } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { requester, product, price } = values;
        const response = await OrderAPI.create({
          requester,
          product: { description: product, price },
        });

        console.log(response);
        if (response.error) {
          this.setState({
            message: 'Não foi possivel solicitar, tente mais tarde.',
            type: 'error',
          });
        } else {
          this.setState({ message: 'Solicitado com sucesso', type: 'success' });
        }
      }
    });
    this.setState({ loading: false });
  };

  render() {
    const { message, type, loading } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className="order">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('requester', {
              rules: [{ required: true, message: 'Solicitante é obrigatorio' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Solicitante"
              />,
            )}
          </Form.Item>
          <Row gutter={10}>
            <Col lg={15} md={15} sm={15}>
              <Form.Item>
                {getFieldDecorator('product', {
                  rules: [{ required: true, message: 'Produto é obrigatorio' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="text"
                    placeholder="Produto"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col lg={5} md={5} sm={5}>
              <Form.Item>
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: 'Preço é obrigatorio' }],
                })(
                  <InputNumber
                    formatter={(value) => {
                      const x = (Number(value) / 100).toFixed(2);
                      return `R$ ${x}`.replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    }}
                    parser={value => value
                      .replace(/\$\s?|(,*)/g, '')
                      .replace('R', '')
                      .replace('.', '')
                    }
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Button
            block
            type="primary"
            icon="upload"
            loading={loading}
            htmlType="submit"
            className="my-5"
            disabled={loading}
          >
            Enviar
          </Button>
        </Form>
        {message && <Alert message={message} type={type} showIcon />}
      </div>
    );
  }
}

OrderForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
};

export default Form.create({ name: 'OrderForm' })(OrderForm);
