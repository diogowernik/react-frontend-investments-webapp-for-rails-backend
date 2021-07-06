import React, { Component } from 'react'
import { Card, CardBody, CardText, Col, Row } from 'reactstrap'
import {AppIndexLayout} from './layouts/IndexLayout';


class AdminIndex extends Component {

  render() {
      return (
        <>
        <AppIndexLayout>
          <h4 className="mt-4 mb-4">Bem vindo ao App.</h4>
          <Row>
          <Col xl={ 3 }>
                <Card outline color="gray" className="mb-3 mt-3">
                    <CardBody>
                        <CardText>
                            <b>Diogo Wernik</b>
                        </CardText>
                    </CardBody>
                </Card>
          </Col>
          <Col xl={ 3 }>
                <Card outline color="gray" className="mb-3 mt-3">
                    <CardBody>
                        <CardText>
                            <b>Marcello Mattos</b>
                        </CardText>
                    </CardBody>
                </Card>
          </Col>
          </Row>
        </AppIndexLayout>
        </>
      )
  }
}

export default AdminIndex