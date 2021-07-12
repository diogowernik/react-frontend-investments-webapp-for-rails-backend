import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function RadarsTables(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card  color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Radar</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vão as tabelas do tipo Radar.
            </p>
        </CardBody>
    </Card>
  )
}

export default RadarsTables