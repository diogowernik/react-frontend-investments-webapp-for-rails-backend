import React from 'react'
import { Label, } from 'reactstrap'

const SelectCategory = (props) => {
  var asset = props.asset
  var category_options = props.category_options

  return (
    <>
      <Label for="category_id">Category</Label>
      <select value={asset.category_id} className="form-control">
        <option value="" disabled selected>Select your option</option>
        {category_options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  )
}

export default SelectCategory