import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function TaxesTables(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card  color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Impostos</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vão as tabelas de impostos.
            </p>
        </CardBody>
    </Card>
  )
}

export default TaxesTables