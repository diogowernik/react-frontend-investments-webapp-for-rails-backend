import React from 'react'
import { MainLayout } from './layouts/MainLayout';
import HistoricalRentability from './components/dashboard/HistoricalRentability'
import PortfolioCompostition from './components/dashboard/PortfolioComposition';

function Smartfolio(props) {
  var id = props.portfolio.id;
  return (
    <>
    <MainLayout>
          <HistoricalRentability />
          <PortfolioCompostition id={id} />
    </MainLayout>
  </>
  )
}

export default Smartfolio
