import React from 'react'
import { Card, CardBody, CardHeader} from 'reactstrap'

function LocationTables(props) {
  // var id = props.portfolio.id;
  // var slug = props.portfolio.slug;
  return (
    <Card outline color="gray" className="mb-3">
        <CardHeader className="bg-gray-lighter">Local dos Recursos</CardHeader>
        <CardBody>
            <p className="mt-4 mb-4">
            Aqui vão as tabela com os locais dos recuros (Bancos, Corretoras, Carteiras digitais).
            </p>
        </CardBody>
    </Card>
  )
}

export default LocationTables