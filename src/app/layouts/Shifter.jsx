import React from 'react'
import PortfoliosTables from './PortfoliosTables'
import PizzaChart from './PizzaChart'

function Composition(props) {
   var id = props.match.params.id;
   
  return (
    <>
          <PortfoliosTables />
          <PizzaChart />
  </>
  )
}

export default Composition