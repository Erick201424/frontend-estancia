import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate()
    const [userList, setUserList] = useState([]);
    const [officeList, setOfficeList] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var names = document.getElementById('names').value;
        var last_name = document.getElementById('apellidoP').value;
        var second_last_name = document.getElementById('apellidoM').value;
        var curp = document.getElementById('curp').value;
        var oficina = document.getElementById('oficina').value;

        var body_json = JSON.stringify({
            "name": names,
            "lastName": last_name,
            "secondSurname": second_last_name,
            "curp": curp,
            "catOfficeId": 1
        });

        var request_json = {
            method: 'POST',
            headers: myHeaders,
            body: body_json,
            redirect: 'follow'
        };

        const res = await fetch('http://localhost:3000/api/client/create', request_json)
            .then(response => response.text())
            .then(result => {
                if (result === "Cliente registrado") {
                    Swal.fire({
                        title: 'Usuario creado con éxito',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    handleClose();
                    show_clients();
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Registro inválido, inténtelo nuevamente',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            });
    }

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
        show_clients();
    }, [])

    const show_clients = async () => {

        const res = await fetch('http://localhost:3000/api/client/list');
        const get_office = await fetch('http://localhost:3000/api/office/list');
        // .then(response => response.json)
        // .then(result => setUserList(result))
        // .catch(error => console.log(error));
        res.json()
            .then(res => setUserList(res))
            .catch(err => console.log(err))

        get_office.json()
            .then(res => setOfficeList(res))
            .catch(err => console.log(err))
    }

    return (
        <div className="container my-5">
            <div className="container-wrapper">
                <div className="container-head">
                    <div className="row g-0">
                        <div className="col-sm-4 col-md-4 mx-auto">
                            <h3>Lista de Clientes</h3>
                        </div>
                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <div className="search-box">
                                <input type={"text"} className="form-control" placeholder="Buscar" />
                            </div>
                        </div>
                        {/* Aquí empieza el dropdown */}
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown button
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <Button variant="primary" onClick={handleShow}>
                                +  Agregar cliente
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Nuevo cliente</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre(s)</Form.Label>
                                            <Form.Control
                                                id="names"
                                                type="name"
                                                placeholder="Alberto"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Apellido paterno</Form.Label>
                                            <Form.Control
                                                id="apellidoP"
                                                type="name"
                                                placeholder="Vázquez"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Apellido materno</Form.Label>
                                            <Form.Control
                                                id="apellidoM"
                                                type="name"
                                                placeholder="Miranda"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>CURP</Form.Label>
                                            <Form.Control
                                                id="curp"
                                                type="name"
                                                placeholder="VAMA970513"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Oficina</Form.Label>
                                            <Form.Control
                                                id="oficina"
                                                type="name"
                                                placeholder="Moral"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                    <Button variant="success" onClick={handleSubmit}>
                                        Crear
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="container-body mt-5">
                    <div className="table-responsive">
                        <table className="table table-stripped table-hover table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Apellido Paterno</th>
                                    <th>Apellido Materno</th>
                                    <th>Curp</th>
                                    <th>Oficina</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((clients) => {
                                    return (
                                        <tr key={clients.id}>
                                            <td>{clients.id}</td>
                                            <td>{clients.name}</td>
                                            <td>{clients.lastName}</td>
                                            <td>{clients.secondSurname}</td>
                                            <td>{clients.curp}</td>
                                            <td>{officeList[clients.catOfficeId - 1].name}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default Users;
