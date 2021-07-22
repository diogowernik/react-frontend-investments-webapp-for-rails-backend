import React, { Component } from 'react'
import { Modal, Button, Alert, Card, } from "react-bootstrap";
import Datatable from '../../../../config/datatable/Datatable';
import PortfoliocriptoForm from './PortfoliocriptoForm';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../../api/PortfolioApi')

class Portfoliocriptos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliocriptos: [],
      portfolio: {       
        id: this.props.id,      
      },
      isLoaded: false,
      error: null,
      dtOptions1: {
        'paging': false, // Table pagination
        'ordering': true, // Column ordering
        'info': false, // Bottom left status text
        responsive: true,
        "dom": '<"float-left"f><"clear">',
        "order": [[ 6, "desc" ]],
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
      this.addPortfoliocripto = this.addPortfoliocripto.bind(this);
  }

  openModal = (id) => {
    this.setState( (prev) => {
        const state = prev.state;
        return { ...state, id: id, isOpen:true };
      });
      };
  closeModal = () => this.setState({ isOpen: false });

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

  removePortfoliocripto = (id) => {
    var portfoliocriptos = [...this.state.portfoliocriptos];
    var index  = portfoliocriptos.findIndex(function(item, i){return item.id === id})
    portfoliocriptos.splice(index, 1);
    this.setState({portfoliocriptos});
    Api.deletePortfoliocripto(id)
  }

  addPortfoliocripto(id, amount, cost, total_cost, total_today ) {
    this.setState(prevState => ({
      portfoliocriptos: [{id, amount, cost, total_cost, total_today }, ...prevState.portfoliocriptos]
    }));
    this.closeModal()
  }

  render() {
    const { error, isLoaded, portfoliocriptos, portfolio } = this.state

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
        <Button className="float-right" 
            variant="primary" 
            onClick={e => this.openModal()}
            >
              Adicionar
            </Button>
        <Card.Header className="bg-gray-lighter text-center">Criptomoedas</Card.Header>
        <Card.Body>
          <Datatable options={this.state.dtOptions1}>
          <table className="table table-striped my-4 w-100">
            <thead >
              <tr>
                <th className="d-none">Id</th>
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
                  <td className="d-none">{portfoliocripto.id}</td>
                  <td>{portfoliocripto.cripto_ticker}</td>
                  <td>{portfoliocripto.amount}</td>
                  <td>{portfoliocripto.cost}</td>
                  <td>{portfoliocripto.total_cost}</td>
                  <td>{portfoliocripto.total_today}</td>
                  <td>
                  <Button 
                      className="btn btn-danger float-right" 
                      onClick={(event) =>
                         this.removePortfoliocripto(portfoliocripto.id)
                      }
                      ><FaTrashAlt /></Button>

                    <Button
                    className="float-right mr-2"
                    onClick={() =>this.openModal(portfoliocripto.id)}
                    >
                    <FaPencilAlt />
                    </Button>
                        </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Datatable>  
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Adicionar / Editar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PortfoliocriptoForm 
                asset={portfolio}
                id={this.state.id || null} 
                addPortfoliocripto={this.addPortfoliocripto}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        </Card.Body>
    </Card>
        </>
      )

    }

  }
}

export default Portfoliocriptos
