import React, { Component } from 'react';
import { Button, Layout, Input, Table } from 'antd';
import _ from 'lodash';

import getSeries from './api/getSeries';

import 'antd/dist/antd.css';

const { Content, Header } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      less: null,
      higher: null,
      columns: [
        {
          title: 'Fecha',
          dataIndex: 'date',
          onFilter: (value, record) => record.date.indexOf(value) === 0,
          sorter: (a, b) => parseFloat(a.date) - parseFloat(b.date),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Generación',
          dataIndex: 'generation',
          onFilter: (value, record) => record.generation.indexOf(value) === 0,
          sorter: (a, b) => a.generation - b.generation,
          sortDirections: ['descend', 'ascend'],
          render: (generation, record) => {
            const isHigher = record.generation === record.higher.generation;
            const isLess = record.generation === record.less.generation;
            const color = '#000000';

            let background = null;

            if (isHigher) {
              background = '#7db65f';
            } else if (isLess) {
              background = '#5d82d5';
            }

            return (
              <Input
                placeholder={`${record.generation}`}
                style={{ background, color }}
              />
            );
          },
        },
        {
          title: 'Unidades',
          dataIndex: 'units',
        },
      ],
      data: [],
    };
  }

  async componentWillMount() {
    await this.getData();
  }

  getData = async () => {
    this.setState({ isLoading: true });

    const series = await getSeries();

    if (
      !!series &&
      !!series.series &&
      !!series.series[0] &&
      !!series.series[0].data
    ) {
      const data = series.series[0].data;

      const dataSort = _.sortBy(data, (el = []) => el[1]);

      let less = null;
      let higher = null;

      if (!!dataSort && !!dataSort.length) {
        less = { date: dataSort[0][0], generation: dataSort[0][1] };

        higher = {
          date: dataSort[dataSort.length - 1][0],
          generation: dataSort[dataSort.length - 1][1],
        };
      }

      this.setState({
        isLoading: false,
        less,
        higher,
        data:
          !!data && !!data.length
            ? data.map((el) => ({
                date: el[0],
                generation: el[1],
                units: 'kWh',
              }))
            : [],
      });
    }
  };

  onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  render() {
    const {
      columns = [],
      data = [],
      higher = null,
      isLoading = false,
      less = null,
    } = this.state;

    return (
      <Layout>
        <Header>
          <Button
            type="primary"
            onClick={this.getData}
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
              !isLoading ? data.map((el = {}) => ({ ...el, higher, less })) : []
            }
            onChange={this.onChange}
          />
        </Content>
      </Layout>
    );
  }
}
