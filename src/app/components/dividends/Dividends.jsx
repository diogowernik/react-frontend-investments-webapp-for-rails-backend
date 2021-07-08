import React from 'react'
import  MainLayout from '../../layouts/MainLayout';
import DividendsList from './DividendsList'
import DividendsTable from './DividendsTable'

function Dividends(props) {
  // var id = props.portfolio.id;
  return (
    <>
    <MainLayout>
          <DividendsTable />
          <DividendsList />
    </MainLayout>
  </>
  )
}

export default Dividends