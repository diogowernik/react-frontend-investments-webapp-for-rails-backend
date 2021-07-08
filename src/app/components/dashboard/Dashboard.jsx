import React from 'react'
import  MainLayout from '../../layouts/MainLayout';
import LineChart from './LineChart'
import TreeMap from './Treemap';

function Dashboard(props) {
  // var id = props.portfolio.id;
  return (
    <>
    <MainLayout>
          <LineChart
          // id={id} 
          />
          <TreeMap 
          // id={id} 
          />
    </MainLayout>
  </>
  )
}

export default Dashboard
