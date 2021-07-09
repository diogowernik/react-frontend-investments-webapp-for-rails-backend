import React from 'react'
import  MainLayout from '../../layouts/MainLayout';
import LineChart from './LineChart'
import TreeMap from './Treemap';

function Dashboard(props) {
  var id = props.match.params.id;
  return (
    <>
    <MainLayout id={id}>
          <LineChart
          // id={id} 
          />
          <TreeMap 
           id={id} 
          />
    </MainLayout>
  </>
  )
}

export default Dashboard
