import React, { Component } from 'react'
import { Alert, Modal, Button } from "react-bootstrap";
import Datatable from '../../../config/datatable/Datatable';
import FiiForm from './FiiForm';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/FiisApi')

class Fiis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiis: [],
      isLoaded: false,
      error: null,
      isOpen: false,
      id: null,

      dtOptions1: {
        'paging': false, // Table pagination
        'ordering': true, // Column ordering
        'info': false, // Bottom left status text
        responsive: true,
        "dom": '<"float-left"f><"clear">',
        "order": [[ 5, "desc" ]],
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
    this.addFii = this.addFii.bind(this);

  }

  openModal = (id) => {
    this.setState( (prev) => {
        const state = prev.state;
        return { ...state, id: id, isOpen:true };
      });
      };
  closeModal = () => this.setState({ isOpen: false });

  componentDidMount() {
    Api.getFiis()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            fiis: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            fiis: data
          })
        }
      })
  }

  removeFii = (id) => {
    var fiis = [...this.state.fiis];
    var index  = fiis.findIndex(function(item, i){return item.id === id})
    fiis.splice(index, 1);
    this.setState({fiis});
    Api.deleteFii(id)
  }

  addFii(id, slug, title, ticker, price) {
    this.setState(prevState => ({
      fiis: [{id, slug, title, ticker, price }, ...prevState.fiis]
    }));
    this.closeModal()
  }

  render() {
    const { error,
            isLoaded, 
            fiis 
          } = this.state

    if (error) {

      return (
        <Alert color="danger">
          Error: {error}
        </Alert>
      )

    } 
    else if (!isLoaded) {

      return (
        <Alert color="primary">
          Loading...
        </Alert>
      )
    } 
    else {

      return (
        <>
            <Button className="float-right" 
            variant="primary" 
            onClick={e => this.openModal()}
            >
              Adicionar
            </Button>            
            <h4 className="mt-4 mb-4">Fundos Imobiliários</h4>
            <Datatable options={this.state.dtOptions1}>
          <table className="table table-striped my-4 w-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ticker</th>
                <th>Title</th>
                <th>Url (Slug)</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fiis.map(fii => (
                <tr key={fii.id}>
                  <td>{fii.id}</td>
                  <td>{fii.ticker}</td>
                  <td>{fii.title}</td>
                  <td>{fii.slug}</td>
                  <td>{fii.price}</td>
                  <td>
                  <Button 
                      className="btn btn-danger float-right" 
                      onClick={(event) =>
                         this.removeFii(fii.id)
                      }
                      ><FaTrashAlt /></Button>

                    <Button
                    className="float-right mr-2"
                    onClick={() =>this.openModal(fii.id)}
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
                <FiiForm 
                id={this.state.id || null} 
                addFii={this.addFii}
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

export default Fiis
