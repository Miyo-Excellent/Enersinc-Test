import React, { Component } from 'react';
import { connect } from 'react-redux';

import EnersincTable from './EnersincTable';

import { asyncData } from './actions';

import 'antd/dist/antd.css';
import { Input } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.columns = [
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
          const color = '#000000';

          let isHigher = record.generation === record.higher.generation;
          let isLess = record.generation === record.less.generation;

          let background = null;

          if (!!isHigher) {
            background = '#7db65f';
          } else if (!!isLess) {
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
    ];
  }

  async componentWillMount() {
    await this.props.asyncData();
  }

  onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  render() {
    const {
      data = [],
      higher = null,
      isLoading = false,
      less = null,
    } = this.props;

    return (
      <EnersincTable
        columns={this.columns}
        data={data}
        higher={higher}
        isLoading={isLoading}
        less={less}
        getData={this.props.asyncData}
        onChange={this.onChange}
      />
    );
  }
}

const mapStateToProps = (state = {}) => ({
  isLoading: state.isLoading,
  less: state.less,
  higher: state.higher,
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  asyncData: async () => await asyncData({ dispatch }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
