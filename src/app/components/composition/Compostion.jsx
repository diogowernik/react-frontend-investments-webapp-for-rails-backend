import React from 'react'
// import PizzaChart from './_PizzaChart'
// import BarChart from './_BarChart'
import { Col, Row} from 'reactstrap'
import Tabs from './_Tabs'

function Composition(props) {
  var id = props.id;
  return (
    <>
      <Row>
        <Col xl={12}>
          <Tabs id={id} />
        </Col>
      </Row>
      {/* <Row>
        <Col xl={6}>
          <PizzaChart />
        </Col>
        <Col xl={6}>
          <BarChart />
        </Col>
      </Row> */}
    </> 
  )
}

export default Composition