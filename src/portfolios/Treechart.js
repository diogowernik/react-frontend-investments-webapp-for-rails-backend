import React from 'react';
import Chart from 'react-apexcharts'
import { apiHost } from '../apiHost.js';

class TreeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'treemap',
          toolbar: {
            show: false,}
        },
        title: {
          text: 'Portfolio',
          align: 'center'
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          formatter: function(text, op) {
            return [text, op.value]
          },
          offsetY: -4
        },
      },
      series: [
        {
          name: '',
          data: []
        }
      ]
    };
  }

  fetchData() {
    fetch(`${apiHost}/api/portfolios/` + this.props.id)
      .then(response => response.json())
      .then(
        (response) => {
          const newSeries = [];
          var chart = response.treechart;
          newSeries.push({chart});

          this.setState({
            series: chart,
          });
        });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type='treemap'
        height="450"
        width="850"
      />
    );
  }
}
export default TreeChart;