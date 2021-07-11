import React from 'react'
import { Card, CardHeader} from 'reactstrap'
import Chart from 'react-apexcharts'
// import { apiHost } from '../../../config/apiHost';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // options: {
      //   chart: {
      //     type: 'treemap',
      //     toolbar: {
      //       show: false,}
      //   },
      //   theme: {
      //     mode: 'light', 
      //     palette: 'palette8', 
      // },
      //   dataLabels: {
      //     enabled: true,
      //     style: {
      //       fontSize: '12px',
      //     },
      //     formatter: function(text, op) {
      //       return [text, op.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })]
      //     },
      //     offsetY: -4
      //   },
      //   tooltip: {
      //     y: {
      //       formatter: function(value) {
      //         return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      //       }
      //     }
      //   },
      //   legend: {
      //     show: true,
      //     position: 'bottom',
      //     horizontalAlign: 'left',
      //     fontSize: '14px',
      //     fontFamily: 'Helvetica, Arial',
      //     fontWeight: 400,
      //     width:'20px',
      //   },
      // },
      // series: [
      //   {
      //     name: '',
      //     data: []
      //   }
      // ]
      series: [{
        name: 'Valor atual',
        type: 'column',
        data: [1.4, 2, 2.5, 3, 3, 4, 3.8, 4.6]
      }, {
        name: 'Investimento inicial',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
      }, {
        name: 'Rentabilidade Histórica',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58]
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: 'XYZ - Stock Analysis (2009 - 2016)',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: "Income (thousand crores)",
              style: {
                color: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            },
            title: {
              text: "Operating Cashflow (thousand crores)",
              style: {
                color: '#00E396',
              }
            },
          },
          {
            seriesName: 'Rentabilidade histórica',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019',
              },
            },
            title: {
              text: "Revenue (thousand crores)",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
    
    }
  }

  // fetchData() {
  //   fetch(`${apiHost}/api/portfolios/` + this.props.id)
  //     .then(response => response.json())
  //     .then(
  //       (response) => {
  //         const newSeries = [];
  //         var chart = response.treechart;
  //         newSeries.push({chart});

  //         this.setState({
  //           series: chart,
  //         });
  //       });
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }

  render() {
    return (
        <>
        <Card outline color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">LineChart</CardHeader>
            <Card body>
                <div id="chart">
                  <Chart 
                  options={this.state.options} 
                  series={this.state.series} 
                  type="line" 
                  height={450} 
                  />
                </div>
                </Card>
        </Card>
        </>
    );
  }
}
export default LineChart;