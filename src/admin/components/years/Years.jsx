import React, { Component } from 'react'
import { Alert, Modal, Button } from "react-bootstrap";
import Datatable from '../../../config/datatable/Datatable';
import YearForm from './YearForm';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/YearsApi.js')

class Years extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      years: [],
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
        "order": [[ 1, "desc" ]],
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
      this.addYear = this.addYear.bind(this);
  }

  openModal = (id) => {
    this.setState( (prev) => {
        const state = prev.state;
        return { ...state, id: id, isOpen:true };
      });
      };
  closeModal = () => this.setState({ isOpen: false });

  componentDidMount() {
    Api.getYears()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            years: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            years: data
          })
        }
      })
  } 

  removeYear = (id) => {
    var years = [...this.state.years];
    var index  = years.findIndex(function(item, i){return item.id === id})
    years.splice(index, 1);
    this.setState({years});
    Api.deleteYear(id)
  }

  addYear(id, slug, title) {
    this.setState(prevState => ({
      years: [{id, slug, title }, ...prevState.years]
    }));
    this.closeModal()
  }

  render() {
    const { error, isLoaded, years } = this.state

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
            
            <h4 className="mt-4 mb-4">Anos</h4>
            <Datatable options={this.state.dtOptions1}>
              <table className="table table-striped my-4 w-100">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Url (Slug)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {years.map(year => (
                  <tr key={year.id}>
                    <td>{year.id}</td>
                    <td>{year.title}</td>
                    <td>{year.slug}</td>
                    <td>
                    <Button 
                      className="btn btn-danger float-right" 
                      onClick={(event) =>
                         this.removeYear(year.id)
                      }
                      ><FaTrashAlt /></Button>

                    <Button
                    className="float-right mr-2"
                    onClick={() =>this.openModal(year.id)}
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
                <YearForm 
                id={this.state.id || null} 
                addYear={this.addYear}
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

export default Years