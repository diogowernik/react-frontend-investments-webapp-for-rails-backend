import React from 'react'
import  MainLayout from './MainLayout';

function Smartfolio(props) {
  var id = props.match.params.id;
  return (
    <>
    <MainLayout id={id} />
  </>
  )
}

export default Smartfolio
