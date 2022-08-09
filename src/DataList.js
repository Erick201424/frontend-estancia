import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function DataList() {
    const [userList, setUserList] = useState([]);

    const columns = [
        { dataField: "id", text: "Id", sort: true },
        { dataField: "name", text: "Nombre", sort: true, filter: textFilter() },
        { dataField: "apellidoP", text: "Apellido Paterno", sort: true },
        { dataField: "apellidoM", text: "Apellido Materno", sort: true },
        { dataField: "curp", text: "Curp", },
        { dataField: "oficina", text: "oficina", }
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firtsPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }
    });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json)
            .then(result => setUserList(result))
            .catch(error => console.log(error));
    }, [])

    return <div>
        <BootstrapTable
            bootstrap4 keyfield='id'
            columns={columns}
            data={userList}
            pagination={pagination}
            filter={filterFactory()}
        />


        {/* 
        <table>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Curp</th>
                <th>Oficina</th>
            </tr> 
            {
                userList && userList.length> 0 ?
                userList.map(usr =>
                <tr>
                    <td>{usr.id}</td>
                    <td>{usr.nombre}</td>
                    <td>{usr.apellidoPaterno}</td>
                    <td>{usr.apellidoMaterno}</td>
                    <td>{usr.curp}</td>
                    <td>{usr.oficina}</td>
                </tr>
                )
                :'Loading'
            }
        </table>*/}
    </div>
}

export default DataList;