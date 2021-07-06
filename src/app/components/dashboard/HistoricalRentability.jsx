import React, { Component } from 'react'
import { Card,CardHeader, CardBody} from 'reactstrap'

class SideModule extends Component {

  render() {
      return (
        <>
        <Card outline color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">Rentabilidade Histórica</CardHeader>
            <CardBody>
                {/* <LineChart data={Line.data} options={Line.options} width={600} height={150}/> */}
            </CardBody>
        </Card>
        </>
      )   
  }
}
export default SideModule
