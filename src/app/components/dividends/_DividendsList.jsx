import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function DividendsList(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card  color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Dividendos Detalhados</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vão as tabelados dividendos recebidos por data com e data de pagamento.
            </p>
        </CardBody>
    </Card>
  )
}

export default DividendsList