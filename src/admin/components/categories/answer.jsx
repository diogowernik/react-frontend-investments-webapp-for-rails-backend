

You are not passing the id in **Categories.jsx**. either you can set the id in the history state or do pass it by component
prop drill.

setting the state in history [Programmatically set params in React Router v4][1]

Or You can do Pass the id to the Component and handle in Component
DidMount Event.

[here is the code sandbox link][2]

**Categories.jsx**


```react
// Create a id variable in state. 
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isLoaded: false,
            error: null,
            isOpen: false,
            id: null 
        };
    }

// change the openModal code to something like this.
openModal = (id) => {
  this.setState( (prev) => {
      const state = prev.state;
      return { ...state, id: id, isOpen:true };
    });
    };


// while Onclick set the id in the state. 
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
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.title}</td>
            <td>{category.slug}</td>
            <td>
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


// Pass the id prop for CategoryForm Component in Modal body from the state. 

<Modal show={this.state.isOpen} onHide={this.closeModal} >
    <Modal.Header closeButton>
    <Modal.Title>Adicionar / Editar</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <CategoryForm id={this.state.id || null} />
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick=  {this.closeModal}>
        Close
    </Button>
    </Modal.Footer>
</Modal>

```

**CategoryForm.jsx**

In the componentDidMount conditionally check if there is id variable in props.


```react
  
  // get id from props

  getCategoryId(props) {
      return props.id
  }

  componentDidMount() {
    // Check if props.id is available 
        if ( this.state.category.id || this.props.id ) {
              const id = this.state.category.id || this.props.id;
                Api.getCategory(id).then((response) => {
                    const [error, data] = response;
                    if (error) {
                        this.setState({
                            errors: data
                        });
                    } else {    
                        this.setState({
                            category: data,
                            errors: []
                        });
                    }
                });
        }
    }


```

  [1]: https://stackoverflow.com/questions/50704284/programmatically-set-params-in-react-router-v4
  [2]: https://codesandbox.io/s/sharp-vaughan-u0zs1?file=/src/App.js