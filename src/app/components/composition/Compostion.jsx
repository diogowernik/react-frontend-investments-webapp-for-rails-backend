import React from 'react'
import  MainLayout from '../../layouts/MainLayout';
import PortfoliosTables from './PortfoliosTables'
import PizzaChart from './PizzaChart'

function Composition(props) {
  // var id = props.portfolio.id;
  return (
    <>
    <MainLayout>
          <PortfoliosTables />
          <PizzaChart />
    </MainLayout>
  </>
  )
}

export default Composition