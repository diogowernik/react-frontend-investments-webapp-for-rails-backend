import React, { Component } from 'react'
import { Alert, Modal, Button } from "react-bootstrap";
import Datatable from '../../../config/datatable/Datatable';
import PortfoliofiiForm from './PortfoliofiiForm';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/PortfoliofiisApi')

class Portfoliofiis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfoliofiis: [],
      isLoaded: false,
      error: null,
      dtOptions1: {
        'paging': false, // Table pagination
        'ordering': true, // Column ordering
        'info': false, // Bottom left status text
        responsive: true,
        "dom": '<"float-left"f><"clear">',
        "order": [[ 8, "desc" ]],
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
      this.addPortfoliofii = this.addPortfoliofii.bind(this);
  }

  openModal = (id) => {
    this.setState( (prev) => {
        const state = prev.state;
        return { ...state, id: id, isOpen:true };
      });
      };
  closeModal = () => this.setState({ isOpen: false });
 
  componentDidMount() {
    Api.getPortfoliofiis()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            portfoliofiis: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            portfoliofiis: data
          })
        }
      })
  }
  removePortfoliofii = (id) => {
    var portfoliofiis = [...this.state.portfoliofiis];
    var index  = portfoliofiis.findIndex(function(item, i){return item.id === id})
    portfoliofiis.splice(index, 1);
    this.setState({portfoliofiis});
    Api.deletePortfoliofii(id)
  }

  addPortfoliofii(id, amount, cost, total_cost, total_today ) {
    this.setState(prevState => ({
      portfoliofiis: [{id, amount, cost, total_cost, total_today }, ...prevState.portfoliofiis]
    }));
    this.closeModal()
  }
  render() {
    const { error, isLoaded, portfoliofiis } = this.state
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
            <Button className="float-right" 
            variant="primary" 
            onClick={e => this.openModal()}
            >
              Adicionar
            </Button>
            <h4 className="mt-4 mb-4">Criptomoedas nos Portfolios</h4>
            <Datatable options={this.state.dtOptions1}>       
            <table className="table table-striped my-4 w-100">
                <thead>
                    <tr>
                        <th data-priority="1">Id</th>
                        <th>Ticker</th>
                        <th>Category</th>
                        <th className="sort-numeric">Portfolio</th>
                        <th className="sort-alpha" data-priority="2">Amount</th>
                        <th>Cost</th>
                        <th>Total Cost</th>
                        <th>Total Today</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {portfoliofiis.map(portfoliofii => (
                    <tr key= {portfoliofii.id}>
                        <td>{portfoliofii.id}</td>
                        <td>{portfoliofii.fii_ticker}{' '}</td>
                        <td>{portfoliofii.category_title}{' '}</td>
                        <td>{portfoliofii.portfolio_title}{' '}</td>
                        <td>{portfoliofii.amount}</td>
                        <td>{portfoliofii.cost}</td>
                        <td>{portfoliofii.total_cost}</td>
                        <td>{portfoliofii.total_today}</td>
                        <td>
                        <Button 
                      className="btn btn-danger float-right" 
                      onClick={(event) =>
                         this.removePortfoliofii(portfoliofii.id)
                      }
                      ><FaTrashAlt /></Button>

                    <Button
                    className="float-right mr-2"
                    onClick={() =>this.openModal(portfoliofii.id)}
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
                <PortfoliofiiForm 
                id={this.state.id || null} 
                addPortfoliofii={this.addPortfoliofii}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        </>
      )

    }

  }
}

export default Portfoliofiis
