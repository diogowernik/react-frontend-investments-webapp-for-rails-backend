import React from 'react'
import  MainLayout from '../../layouts/MainLayout';
import LocationsTable from './LocationsTable'
import DonutChart from './DonutChart'

function Location(props) {
  var id = props.match.params.id;
  return (
    <>
    <MainLayout id={id}>
          <LocationsTable />
          <DonutChart />
    </MainLayout>
  </>
  )
}

export default Location