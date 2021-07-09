import React from 'react';
import Chart from 'react-apexcharts'
import {  Card, CardHeader} from 'reactstrap'
// import { apiHost } from '../../../config/apiHost';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

        series: [{
            name: 'Aporte',
            data: [44, 55, 49, 54, 22]
          }, {
            name: 'Valor Atual',
            data: [53, 58, 49, 58, 25]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            tooltip: {
              shared: true,
              intersect: false
            },
            xaxis: {
              categories: ["Fiis", "Criptos", "Imóveis", "ETF", "Ações"],
            },
            yaxis: {
                reversed: true,
                axisTicks: {
                  show: true
                }
              }
          },
    
    
    };
    //   options: {
    //     chart: {
    //       type: 'treemap',
    //       toolbar: {
    //         show: false,}
    //     },
    //     theme: {
    //       mode: 'light', 
    //       palette: 'palette8', 
    //   },
    //     dataLabels: {
    //       enabled: true,
    //       style: {
    //         fontSize: '12px',
    //       },
    //       formatter: function(text, op) {
    //         return [text, op.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })]
    //       },
    //       offsetY: -4
    //     },
    //     tooltip: {
    //       y: {
    //         formatter: function(value) {
    //           return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    //         }
    //       }
    //     },
    //     legend: {
    //       show: true,
    //       position: 'bottom',
    //       horizontalAlign: 'left',
    //       fontSize: '14px',
    //       fontFamily: 'Helvetica, Arial',
    //       fontWeight: 400,
    //       width:'20px',
    //     },
    //   },
    //   series: [
    //     {
    //       name: '',
    //       data: []
    //     }
    //   ]
    // }

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
            <CardHeader className="bg-gray-lighter">BarChart</CardHeader>
            <Card body>
                <Chart
                    // options={this.state.options}
                    // series={this.state.series}
                    // type='treemap'
                    // height="450"
                    // width="100%"
                    options={this.state.options} 
                    series={this.state.series} 
                    type="bar"
                    height="450"
                />
                </Card>
        </Card>
        </>
    );
  }
}
export default BarChart;