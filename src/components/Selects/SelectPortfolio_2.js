import React from 'react';
import { Label, } from 'reactstrap'
import { apiHost } from '../../config/apiHost.js';

class SelectPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // asset: this.props.asset,
        portfolio_options:[]
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    fetch(apiHost + '/api/portfolio/options')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          portfolio_options: result
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
  const { error, isLoaded, portfolio_options  } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <Label for="portfolio_id">Portfolio</Label>
      <select value={this.props.asset.portfolio_id} className="form-control">
        <option value="" disabled selected>Select your option</option>
        {portfolio_options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </>
    );
  }
}
}

export default SelectPortfolio;