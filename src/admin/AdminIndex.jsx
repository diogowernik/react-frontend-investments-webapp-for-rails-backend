import React, { Component } from 'react'
import {DashboardLayout} from './layouts/Layout';


class AdminIndex extends Component {

  render() {
      return (
        <>
        <DashboardLayout>
          <h4 className="mt-4 mb-4">Bem vindo a Area Administrativa.</h4>
        </DashboardLayout>
        </>
      )
  }
}

export default AdminIndex
