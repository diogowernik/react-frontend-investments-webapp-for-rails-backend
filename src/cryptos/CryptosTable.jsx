import React, { Component } from 'react'
import $ from 'jquery';
import Datatable from '../Datatable.js';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class CryptosTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptos: props.cryptos
    }
  }
  state = {
    dtOptions2: {
        'paging': true, // Table pagination
        'ordering': true, // Column ordering
        'info': true, // Bottom left status text
        responsive: true,
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
            sSearch: '<em class="fa fa-search"></em>',
            sLengthMenu: '_MENU_ records per page',
            info: 'Showing page _PAGE_ of _PAGES_',
            zeroRecords: 'Nothing found - sorry',
            infoEmpty: 'No records available',
            infoFiltered: '(filtered from _MAX_ total records)',
            oPaginate: {
                sNext: '<em class="fa fa-caret-right"></em>',
                sPrevious: '<em class="fa fa-caret-left"></em>'
            }
        },
        // Datatable Buttons setup
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copy', className: 'btn-info' },
            { extend: 'csv', className: 'btn-info' },
            { extend: 'excel', className: 'btn-info', title: 'XLS-File' },
            { extend: 'pdf', className: 'btn-info', title: $('title').text() },
            { extend: 'print', className: 'btn-info' }
        ]
    }
  }
  dtInstance = dtInstance => {
      const inputSearchClass = 'datatable_input_col_search';
      const columnInputs = $('tfoot .' + inputSearchClass);
      // On input keyup trigger filtering
      columnInputs
          .keyup(function() {
              dtInstance.fnFilter(this.value, columnInputs.index(this));
          });
  }
  render() {
    const cryptos = this.state.cryptos
    if (cryptos.length === 0) {
      return <div></div>
    } else {
      return (
        <Datatable options={this.state.dtOptions2}>
          <table className="table table-striped my-4 w-100">
            <thead >
              <tr>
                <th>Id</th>
                <th>Ticker</th>
                <th>Category</th>
                <th>Portfolio</th>
                <th>Amount</th>
                <th>Cost</th>
                <th>Total Cost</th>
                <th>Total Today</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map(crypto => (
                <tr key={crypto.id}>
                  <td>{crypto.id}</td>
                  <td><a href={`/radarcrypto/${crypto.radarcrypto.id}`}>{crypto.radarcrypto.ticker}</a></td>
                  <td><a href={`/category/${crypto.category.id}`}>{crypto.category.title}</a></td>
                  <td><a href={`/portfolio/${crypto.portfolio.id}`}>{crypto.portfolio.title}</a></td>
                  <td>{crypto.amount}</td>
                  <td>{crypto.cost}</td>
                  <td>{crypto.total_cost}</td>
                  <td>{crypto.total}</td>
                  <td>
                    <a className="btn btn-success" href={`/crypto/${crypto.id}/edit`}><FaPencilAlt /></a>{' '}
                    <a className="btn btn-danger" href={`/crypto/${crypto.id}/delete`}><FaTrashAlt /></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Datatable>  
      )
    }
  }
}

export default CryptosTable
