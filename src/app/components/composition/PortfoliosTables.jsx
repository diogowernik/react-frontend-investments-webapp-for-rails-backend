import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function PortfoliosTables(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card outline color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Composição dos Recursos</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vão as tabelas divididas por tipos de ativos.
            </p>
        </CardBody>
    </Card>
  )
}

export default PortfoliosTables