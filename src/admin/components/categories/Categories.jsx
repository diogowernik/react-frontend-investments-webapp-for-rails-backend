import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Alert, Modal, Button } from "react-bootstrap";
import Datatable from '../../../globalcomponents/datatable/Datatable';
import CategoryForm from './CategoryForm';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

const Api = require('../../api/CategoriesApi.js')

class Categories extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      categories: [],
      isLoaded: false,
      error: null,
      isOpen: false,
      id: null
      }
  }

  openModal = (id) => {
    this.setState( (prev) => {
        const state = prev.state;
        return { ...state, id: id, isOpen:true };
      });
      };
  closeModal = () => this.setState({ isOpen: false });

  componentDidMount() {
    Api.getCategories()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            categories: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            categories: data
          })
        }
      })
  } 

  render() {
    const { error, isLoaded, categories } = this.state

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
            <Button className="float-right" variant="primary" 
            // onClick={this.openModal}
            onClick={e => this.openModal({modalType: 'create'})}
            >
              Adicionar
            </Button>
            
            <h4 className="mt-4 mb-4">Categorias de investimentos</h4>
            <Datatable>
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
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.title}</td>
                    <td>{category.slug}</td>
                    <td>
                      <Link className="btn btn-danger float-right" to={`/admin/category/${category.id}/delete`}><FaTrashAlt /></Link>
                      <Link className="btn btn-success float-right mr-2" to={`/admin/category/${category.id}/edit`}><FaPencilAlt /></Link>{' '}

                      {/* <Button className="float-right mr-2" variant="primary" onClick={this.openModal}>
                        Modal Edit
                      </Button> */}

                              <Button
                                className="float-right mr-2"
                                variant="primary"
                                onClick={() =>this.openModal(category.id)}
                              >
                                Modal Edit
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
                {/* <CategoryForm /> */}
                <CategoryForm id={this.state.id || null} />
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

export default Categories
