import React from 'react'
// import LineChart from './_LineChart'
import TreeMap from './_Treemap';

function Dashboard(props) {
  var id = props.id;
  return (
    <>
      {/* <LineChart
      /> */}
      <TreeMap 
        id={id} 
      />
    </>
  )
}

export default Dashboard
