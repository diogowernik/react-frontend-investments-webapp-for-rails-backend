import React from 'react'
import  MainLayout from '../../layouts/MainLayout';
import LocationsTable from './LocationsTable'
import DonutChart from './DonutChart'

function Location(props) {
  // var id = props.portfolio.id;
  return (
    <>
    <MainLayout>
          <LocationsTable />
          <DonutChart />
    </MainLayout>
  </>
  )
}

export default Location