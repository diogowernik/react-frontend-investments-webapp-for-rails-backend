import React, { Component } from 'react'
import $ from 'jquery';
import Datatable from './Datatable.js';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class FiisTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiis: props.fiis
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
    const fiis = this.state.fiis
    if (fiis.length === 0) {
      return <div></div>
    } else {
      return (
        <Datatable options={this.state.dtOptions2}>
            <table className="table table-striped my-4 w-100">
                <thead>
                    <tr>
                        <th data-priority="1">Id</th>
                        <th>Ticker</th>
                        <th>Category</th>
                        <th className="sort-numeric">Portfolio</th>
                        <th className="sort-alpha" data-priority="2">Amount</th>

                        <th>Cost</th>
                        <th>Total Cost</th>
                        <th>Total Today</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {fiis.map(fii => (
                    <tr key= {fii.id}>
                        <td>{fii.id}</td>
                        <td><a href={`/radarfii/${fii.radarfii.id}`}>{fii.radarfii.ticker}</a>{' '}</td>
                        <td><a href={`/category/${fii.category.id}`}>{fii.category.title}</a>{' '}</td>
                        <td><a href={`/portfolio/${fii.portfolio.id}`}>{fii.portfolio.title}</a>{' '}</td>
                        <td>{fii.amount}</td>
                        <td>{fii.cost}</td>
                        <td>{fii.total_cost}</td>
                        <td>{fii.total}</td>
                        <td>
                          <a className="btn btn-success" href={`/fii/${fii.id}/edit`}><FaPencilAlt /></a>{' '}
                          <a className="btn btn-danger" href={`/fii/${fii.id}/delete`}><FaTrashAlt /></a>
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

export default FiisTable

