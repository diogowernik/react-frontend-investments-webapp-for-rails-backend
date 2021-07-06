import React, { Component } from 'react'
import { Card,CardHeader, CardBody, CardText, CardTitle} from 'reactstrap'

class SideModule extends Component {

  render() {
      return (
        <>
        <Card outline color="gray" className="mb-3">
            <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</CardText>
            </CardBody>
        </Card>
        <Card outline color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">Header</CardHeader>
            <CardBody>
                <CardTitle>Success card title</CardTitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</CardText>
            </CardBody>
        </Card>
        </>
      )   
  }
}
export default SideModule
