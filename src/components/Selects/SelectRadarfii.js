import React from 'react';
import { Label, } from 'reactstrap'
import { apiHost } from '../../config/apiHost.js';

class SelectRadarfii extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // asset: this.props.asset,
        radarfii_options:[]
    };
    this.handleChange = props.onChange;
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    fetch(apiHost + '/api/radarfii/options')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          radarfii_options: result
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
  const { error, isLoaded, radarfii_options  } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <Label for="radarfii_id">Radarfii</Label>
      <select value={this.props.asset.radarfii_id} className="form-control" onChange={this.handleChange}>
        <option value="" disabled defaultValue>Select your option</option>
        {radarfii_options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </>
    );
  }
}
}

export default SelectRadarfii;