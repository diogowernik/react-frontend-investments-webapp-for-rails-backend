import React from 'react'
import LocationsTable from './_LocationsTable'
import DonutChart from './_DonutChart'

function Location(props) {
  // var id = props.match.params.id;
  return (
    <>
      <LocationsTable />
      <DonutChart />
    </>
  )
}

export default Location