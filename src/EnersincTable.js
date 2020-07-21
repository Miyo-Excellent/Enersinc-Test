import React, { Component } from 'react';
import { Button, Layout, Table } from 'antd';

const { Content, Header } = Layout;

export default class EnersincTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentWillMount() {
    await this.props.getData();
  }

  render() {
    const {
      columns = [],
      data = [],
      higher = null,
      isLoading = false,
      less = null,
    } = this.props;

    return (
      <Layout>
        <Header>
          <Button
            type="primary"
            onClick={this.props.getData}
            disabled={isLoading}
            loading={isLoading}
          >
            Actualizar
          </Button>
        </Header>

        <Content>
          <Table
            columns={columns}
            dataSource={
              !isLoading ? data : []
            }
            onChange={this.props.onChange}
          />
        </Content>
      </Layout>
    );
  }
}
