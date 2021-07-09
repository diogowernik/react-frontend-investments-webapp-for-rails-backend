import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function OrdersTables(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card outline color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Operações</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vão as tabela das Operações realizadas.
            </p>
        </CardBody>
    </Card>
  )
}

export default OrdersTables