import React, { Component } from 'react'
import { Card,CardHeader, CardBody, Table } from 'reactstrap'

class Performance extends Component {

  render() {
      return (
        <>
            <Card outline color="gray" className="mb-3">
                <CardHeader className="bg-gray-lighter">Performance</CardHeader>
                <CardBody>
                <p className="text-center h3 m-3 text-primary">
                
                2,35 %
                </p>
                <p className="text-center text-muted m-3">
                
                Rentabilidade do porfólio Atual
                </p>
                </CardBody>
                <CardBody>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <td>Patrimônio</td>
                                <td><div className="float-right strong">R$ 535.000,00</div></td>
                            </tr>
                            <tr>
                                <td>Custo de aquisição</td>
                                <td><div className="float-right strong">R$ 500.000,00</div></td>
                            </tr>
                            <tr>
                                <td>Proventos Acumulado</td>
                                <td><div className="float-right strong">R$ 20.000,00</div></td>
                            </tr>
                            <tr>
                                <td>Lucros com operações</td>
                                <td><div className="float-right strong">R$ 15.000,00</div></td>
                            </tr>
                            <tr className="mt-1">
                                <th><div className="mt-2 strong">Lucro</div></th>
                                <th><div className="float-right h3 text-primary">R$ 25.000,00</div></th>
                            </tr>
                        </tbody>
                        
                            
                        
                    </Table>
                </CardBody>
            </Card>

        </>
      )   
  }
}
export default Performance
