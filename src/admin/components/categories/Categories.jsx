import React, { Component } from 'react'
import { Alert, Modal, Button } from "react-bootstrap";
import Datatable from '../../../config/datatable/Datatable';
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
      this.addCategory = this.addCategory.bind(this);
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

  removeCategory = (id) => {
    var categories = [...this.state.categories];
    var index  = categories.findIndex(function(item, i){return item.id === id})
    categories.splice(index, 1);
    this.setState({categories});
    Api.deleteCategory(id)
  }

  addCategory(id, slug, title) {
    this.setState(prevState => ({
      categories: [...prevState.categories, {id, slug, title }]
    }));
    this.closeModal()
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
            <Button className="float-right" 
            variant="primary" 
            onClick={e => this.openModal()}
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
                    <Button 
                      className="btn btn-danger float-right" 
                      onClick={(event) =>
                         this.removeCategory(category.id)
                      }
                      ><FaTrashAlt /></Button>

                    <Button
                    className="float-right mr-2"
                    onClick={() =>this.openModal(category.id)}
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
                <CategoryForm 
                id={this.state.id || null} 
                addCategory={this.addCategory}
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

export default Categories