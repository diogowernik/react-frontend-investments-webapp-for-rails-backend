import React from 'react';
import { Label, } from 'reactstrap'
import { apiHost } from '../apiHost.js';

class SelectCripto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // asset: this.props.asset,
        cripto_options:[]
    };
    this.handleChange = props.onChange;
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    fetch(apiHost + '/api/cripto/options')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          cripto_options: result
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
  const { error, isLoaded, cripto_options  } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <Label for="cripto_id">Cripto</Label>
      <select value={this.props.asset.cripto_id} className="form-control" onChange={this.handleChange}>
        <option value="" disabled defaultValue>Select your option</option>
        {cripto_options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </>
    );
  }
}
}

export default SelectCripto;