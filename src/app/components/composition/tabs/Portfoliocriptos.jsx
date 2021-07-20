import React, { Component } from 'react'
import { Alert, Card, CardBody, CardHeader } from 'reactstrap'
import Datatable from '../../../../config/datatable/Datatable';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../../api/PortfolioApi')

class Portfoliocriptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: {
        id: this.props.id,
        portfoliocriptos: [],
      },
      isLoaded: false,
      error: null,

      dtOptions1: {
        'paging': false, // Table pagination
        'ordering': true, // Column ordering
        'info': false, // Bottom left status text
        responsive: true,
        "dom": '<"float-left"f><"clear">',
        "order": [[ 3, "desc" ]],
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
            sSearch: '<em class="fa fa-search"></em>',
            sLengthMenu: '_MENU_ records per page',
            info: 'Showing page _PAGE_ of _PAGES_',
            zeroRecords: 'Nothing found - sorry',
            infoEmpty: 'No records available',
            infoFiltered: '(filtered from _MAX_ total records)',
            oPaginate: {
                sNext: '<em class="fa fa-caret-right"></em>',
                sPrevious: '<em class="fa fa-caret-left"></em>'
            }
        }
    },
    }
  }

  componentDidMount() {
    if (this.state.portfolio.id) {
    Api.getPortfoliocriptos(this.state.portfolio.id)
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portfoliocriptos: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portfoliocriptos: data
          })
        }
      })
    }
  }

// Access to internal datatable instance for customizations


  render() {
    const { error, isLoaded, portfoliocriptos } = this.state

    if (error) {

      return (
        <Alert color="danger">
          Error: {error}
        </Alert>
      )

    } else if (!isLoaded) {

      return (
        <Alert color="primary">
          Loading...
        </Alert>
      )

    } else {

      return (
        <>
        <Card color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter text-center">Criptomoedas</CardHeader>
        <CardBody>
          <Datatable options={this.state.dtOptions1}>
          <table className="table table-striped my-4 w-100">
            <thead >
              <tr>
                <th>Ticker</th>
                <th>Quantidade</th>
                <th>Preço Médio</th>
                <th>Custo Total</th>
                <th>Valor Hoje</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {portfoliocriptos.map(portfoliocripto => (
                <tr key={portfoliocripto.id}>
                  <td>{portfoliocripto.cripto_ticker}</td>
                  <td>{portfoliocripto.amount}</td>
                  <td>{portfoliocripto.cost}</td>
                  <td>{portfoliocripto.total_cost}</td>
                  <td>{portfoliocripto.total_today}</td>
                  <td>
                    <a className="btn btn-danger float-right" href={`/admin/portfoliocripto/${portfoliocripto.id}/delete`}><FaTrashAlt /></a>
                    <a className="btn btn-success float-right mr-2" href={`/admin/portfoliocripto/${portfoliocripto.id}/edit`}><FaPencilAlt /></a>{' '}              
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Datatable>  
        </CardBody>
    </Card>
        </>
      )

    }

  }
}

export default Portfoliocriptos
