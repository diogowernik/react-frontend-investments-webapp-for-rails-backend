import React from 'react';
import Chart from 'react-apexcharts'
import {  Card, CardHeader} from 'reactstrap'
// import { apiHost } from '../../../config/apiHost';

class PizzaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      series: [25, 15, 44, 55, 41, 17],
      options: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: ["Cripto", "Fiis", "Ações", "Stocks", "ETF", "Renda Fixa"],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        title: {
          text: "Monochrome Pie"
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: false
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
            <CardHeader className="bg-gray-lighter">PizzaChart</CardHeader>
            <Card body>
                <Chart
                    // options={this.state.options}
                    // series={this.state.series}
                    // type='treemap'
                    // height="450"
                    // width="100%"
                    options={this.state.options} 
                    series={this.state.series} 
                    type="pie"
                    height="450"
                />
                </Card>
        </Card>
        </>
    );
  }
}
export default PizzaChart;