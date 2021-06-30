import React from 'react'
import { Label, } from 'reactstrap'

const SelectPortfolio = (props) => {
  var asset = props.asset
  var portfolio_options = props.portfolio_options

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
  )
}

export default SelectPortfolio