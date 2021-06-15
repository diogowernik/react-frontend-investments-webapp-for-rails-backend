import React from 'react';
import Chart from 'react-apexcharts'


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
      },
      series: [
        {
          name: 'Marketcap',
          data: []
        }
      ]
    };
  }

  fetchData() {
    fetch("https://api.miz.finance/api/portfolios/" + this.props.id)
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
        height="350"
        width="664"
      />
    );
  }
}
export default TreeChart;