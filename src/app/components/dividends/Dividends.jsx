import React from 'react'
import DividendsList from './_DividendsList'
import DividendsTable from './_DividendsTable'

function Dividends(props) {
  return (
    <>
      <DividendsTable />
      <DividendsList />
    </>
  )
}

export default Dividends