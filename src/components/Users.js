import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'; 

const Users = () => {
    const navigate = useNavigate()
    const [userList, setUserList] = useState([]);
    const [officeList, setOfficeList] = useState([]);
    const [show, setShow] = useState(false);
    const [smShow, setSmShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var names = document.getElementById('names').value;
        var last_name = document.getElementById('apellidoP').value;
        var second_last_name = document.getElementById('apellidoM').value;
        var curp = document.getElementById('curp').value;
        var oficina = (document.getElementById('oficina').selectedIndex) + 1;

        var body_json = JSON.stringify({
            "name": names,
            "lastName": last_name,
            "secondSurname": second_last_name,
            "curp": curp,
            "catOfficeId": oficina
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

    const handleAddOffice = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var oficina = document.getElementById('office').value;

        var body_json = JSON.stringify({
            "name": oficina
        });

        var request_json = {
            method: 'POST',
            headers: myHeaders,
            body: body_json,
            redirect: 'follow'
        };

        const res = await fetch('http://localhost:3000/api/office/create', request_json)
            .then(response => response.text())
            .then(result => {
                if (result === "Oficina registrada") {
                    Swal.fire({
                        title: 'Oficina creada con éxito',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    setSmShow(false);
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

    // const pagination = paginationFactory({
    //     page: 1,
    //     sizePerPage: 5,
    //     lastPageText: '>>',
    //     firtsPageText: '<<',
    //     nextPageText: '>',
    //     prePageText: '<',
    //     showTotal: true,
    //     alwaysShowAllBtns: true,
    //     onPageChange: function (page, sizePerPage) {
    //         console.log('page', page);
    //         console.log('sizePerPage', sizePerPage);
    //     },
    //     onSizePerPageChange: function (page, sizePerPage) {
    //         console.log('page', page);
    //         console.log('sizePerPage', sizePerPage);
    //     }
    // });

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

    const searching = async () => {
        $(document).ready(function(){
            $("#search").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $("#productTable tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
            });
          });
    }

    const pagination = async () => {
        $(document).ready(function () {
            $('#paginationId').DataTable();
            $('.dataTables_length').addClass('bs-select');
          });
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
                                <input type={"text"} onKeyUp={searching} className="form-control" id="search" placeholder="Buscar" />
                            </div>
                        </div>
                        {/* Aquí empieza el dropdown */}

                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <Button variant="info" onClick={() => setSmShow(true)}>
                                +  Agregar oficina
                            </Button>
                            <Modal
                                size="sm"
                                show={smShow}
                                onHide={() => setSmShow(false)}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-sm">
                                        Nueva oficina
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre de la nueva oficina</Form.Label>
                                            <Form.Control
                                                id="office"
                                                type="name"
                                                placeholder="Moral"
                                                autoFocus
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={() => setSmShow(false)}>
                                        Cancelar
                                    </Button>
                                    <Button variant="success" onClick={handleAddOffice}>
                                        Crear
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* <Button variant="success" onClick={handleShowOffice}>
                                +  Agregar oficina
                            </Button>

                            <Modal showOffice={showOffice} onHide={handleCloseOffice}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Nueva oficina</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Oficina</Form.Label>
                                            <Form.Control
                                                id="office"
                                                type="name"
                                                placeholder="Moral"
                                                autoFocus
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={handleCloseOffice}>
                                        Cancelar
                                    </Button>
                                    <Button variant="success" onClick={handleAddOffice}>
                                        Crear
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}
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
                                        {/* <Form.Group className="mb-3">
                                            <Form.Label>Oficina</Form.Label>
                                            <Form.Control
                                                id="oficina"
                                                type="name"
                                                placeholder="Moral"
                                            />
                                        </Form.Group> */}
                                        <div className="form-group col-mb-3">
                                            <label htmlFor="inputState">Oficina</label>
                                            <select id="oficina" className="form-control">
                                                {officeList.map((item) =>
                                                    <option key={item.id}>{item.name}</option>
                                                )};
                                            </select>
                                        </div>
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
                        <table className="table table-stripped table-hover table-borderless" id="paginationId">
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
                            <tbody id="productTable">
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
