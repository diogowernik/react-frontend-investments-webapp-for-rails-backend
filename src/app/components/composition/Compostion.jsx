import React from 'react'
import  MainLayout from '../../layouts/MainLayout';
import PortfoliosTables from './PortfoliosTables'
import PizzaChart from './PizzaChart'

function Composition(props) {
   var id = props.match.params.id;
  return (
    <>
    <MainLayout id={id}>
          <PortfoliosTables />
          <PizzaChart />
    </MainLayout>
  </>
  )
}

export default Composition