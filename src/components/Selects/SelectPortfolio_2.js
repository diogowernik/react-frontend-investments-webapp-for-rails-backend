import React from 'react';
import { Label, } from 'reactstrap'
import { apiHost } from '../../config/apiHost.js';

class SelectPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        asset: props.asset,
        portfolio_options:[],
    }
  }
  fetchData() {
    fetch(apiHost + '/api/portfolio/options')
        .then(response => response.json())
        .then(
            this.setState({
                portfolio_options,
              })

        ),
        // handle errors here
        (errors) => {
          this.setState({
            errors            
          });console.log(errors)
        }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
        <>
        <Label for="portfolio_id">Portfolio</Label>
        <select value={asset.portfolio_id} className="form-control">
          <option value="" disabled selected>Select your option</option>
          {portfolio_options.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
      </>
    );
  }
}
export default SelectPortfolio;