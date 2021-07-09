import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function DividendsTables(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card outline color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Proventos Totais Mensal</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vão as tabela dos dividendos total por mês.
            </p>
        </CardBody>
    </Card>
  )
}

export default DividendsTables