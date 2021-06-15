import React, { Component } from 'react'

import $ from 'jquery';

import Datatable from './Datatable.js';

class FiisTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiis: props.fiis
    }
  }

  state = {
    dtOptions1: {
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
        }
    },
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
    },
    dtOptions3: {
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
        // Datatable key setup
        keys: true
    }
  }

// Access to internal datatable instance for customizations
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
                    </tr>
                </thead>
                <tbody>
                {fiis.map(fii => (
                    <tr key= {fii.id}>
                        <td>{fii.id}</td>
                        <td>{fii.radarfii.ticker}</td>
                        <td>{fii.category.title}</td>
                        <td>{fii.portfolio.title}</td>
                        <td>{fii.amount}</td>
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