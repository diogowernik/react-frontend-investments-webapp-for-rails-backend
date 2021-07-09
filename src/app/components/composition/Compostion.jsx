import React from 'react'
import PizzaChart from './_PizzaChart'
import BarChart from './_BarChart'
import { Col, Row} from 'reactstrap'
import Tabs from './_Tabs'

function Composition(props) {
  //  var id = props.match.params.id;
  return (
    <>
      <Row>
        <Col xl={12}>
          <Tabs />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <PizzaChart />
        </Col>
        <Col xl={6}>
          <BarChart />
        </Col>
      </Row>
    </>
  )
}

export default Composition