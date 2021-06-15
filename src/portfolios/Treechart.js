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
        theme: {
          mode: 'light', 
          palette: 'palette8', 
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
        tooltip: {
          y: {
            formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
              return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          }
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'right',
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial',
          fontWeight: 400,
          width:'20px',
        },
      },
      series: [
        {
          name: '',
          data: []
        }
      ]
    }
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