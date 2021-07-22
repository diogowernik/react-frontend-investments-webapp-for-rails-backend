import React from 'react';
import { Label, } from 'reactstrap'
import { apiHost } from '../../config/apiHost.js';

class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        category_options:[]
    };
    this.handleChange = props.onChange;
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    fetch(apiHost + '/api/category/options')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          category_options: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
}

render() {
  const { error, isLoaded, category_options  } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <Label for="category_id">Category</Label>
      <select value={this.props.asset.category_id} className="form-control" onChange={this.handleChange}>
        <option value="" disabled defaultValue>Select your option</option>
        {category_options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </>
    );
  }
}
}

export default SelectCategory;