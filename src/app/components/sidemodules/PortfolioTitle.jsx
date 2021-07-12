import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'

function PortfolioTitle(props) {
  var title = props.portfolio.title;
  return (
    <Card  color="gray" className="mb-3 mt-3">
      <CardBody>
        <CardText>
          <b>{title}</b>
        </CardText>
      </CardBody>
    </Card>
)
}

export default PortfolioTitle