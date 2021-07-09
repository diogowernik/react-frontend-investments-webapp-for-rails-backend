import React from 'react'
import PortfoliosTables from './_PortfoliosTables'
import PizzaChart from './_PizzaChart'

function Composition(props) {
  //  var id = props.match.params.id;
  return (
    <>
      <PortfoliosTables />
      <PizzaChart />
    </>
  )
}

export default Composition