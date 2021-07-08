import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'

function AppMenu(props) {
  var id = props.portfolio.id;
  var slug = props.portfolio.slug;
  return (
    <Card outline color="gray" className="mb-3 mt-3">
      <CardBody>
        <CardText>
          <a className="h5 m-4" href={'/smartfolio/' + slug + '/' + id}>Dashboard</a>
          <a className="h5 m-4" href={'/smartfolio/' + slug + '/composition/' + id}>Composição</a>
          <a className="h5 m-4" href={'/smartfolio/' + slug + '/location/' + id}>Localização</a>
          <a className="h5 m-4" href={'/smartfolio/' + slug + '/dividends/' + id}>Dividendos</a>

          {/* <a className="h5 m-4" href={'/smartfolio/' + slug + '/' + id}>Tokens</a>         
          <a className="h5 m-4" href={'/smartfolio/' + slug + '/' + id}>Operações</a>
          <a className="h5 m-4" href={'/smartfolio/' + slug + '/' + id}>Impostos</a>
          <a className="h5 m-4" href={'/smartfolio/' + slug + '/' + id}>Radar</a> */}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default AppMenu
