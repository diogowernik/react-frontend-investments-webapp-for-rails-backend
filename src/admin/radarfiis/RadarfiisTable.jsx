import React, { Component } from 'react'
import $ from 'jquery';
import Datatable from '../Datatable.js';
import { FaPencilAlt,FaTrashAlt  } from 'react-icons/fa';

class RadarfiisTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radarfiis: props.radarfiis
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
    const radarfiis = this.state.radarfiis
    if (radarfiis.length === 0) {
      return <div></div>
    } else {
      return (
        <Datatable options={this.state.dtOptions2}>
          <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticker</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {radarfiis.map(radarfii => (
              <tr key={radarfii.id}>
                <td>{radarfii.id}</td>
                <td><a href={`/radarfii/${radarfii.id}`}>{radarfii.ticker}</a></td>
                <td>{radarfii.title}</td>
                <td>{radarfii.slug}</td>
                <td>{radarfii.price}</td>
                <td>
                    <a className="btn btn-success" href={`/radarfii/${radarfii.id}/edit`}><FaPencilAlt /></a>{' '}
                    <a className="btn btn-danger" href={`/radarfii/${radarfii.id}/delete`}><FaTrashAlt /></a>
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

export default RadarfiisTable
