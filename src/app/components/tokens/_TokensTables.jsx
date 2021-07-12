import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function TokensTables(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card  color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Tokens System</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vai as tabela do Tokens System.
            </p>
        </CardBody>
    </Card>
  )
}

export default TokensTables