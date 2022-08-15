import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";

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

    useEffect(() => {
        show_clients();
    }, [])

    const show_clients = async () => {

        const res = await fetch('http://localhost:3000/api/client/list');
        const get_office = await fetch('http://localhost:3000/api/office/list');
        res.json()
            .then(res => setUserList(res))
            .catch(err => console.log(err))

        get_office.json()
            .then(res => setOfficeList(res))
            .catch(err => console.log(err))
    }

    const searching = async () => {
        $(document).ready(function () {
            $("#search").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#productTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }

    return (
        <div className="container my-5 shadow-lg p-3 bg-body rounded">
            <div className="container-title text-center">
                <h3 className="fw-bold">Lista de Clientes</h3>
            </div>
            <div className="container-head mt-3">
                <div className="row align-items-stretch">
                    <div className="d-grid gap-2 col-sm-3 col-md-3 my-3 text-start">
                        <Button type="button" variant="info" className="mx-4" onClick={() => {
                            navigate('/office')
                        }}>
                            Ir a oficinas
                        </Button>
                    </div>
                    <div className="col-sm-3 col-md-6 my-3 text-center">
                        <div className="search-box mx-5">
                            <input type={"text"} onKeyUp={searching} className="form-control" id="search" placeholder="Buscar" />
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-sm-3 col-md-3 my-3 text-end">
                        <Button type="button" variant="primary" className="mx-4" onClick={handleShow}>
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
                                            type="text"
                                            placeholder="Nombres"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Apellido paterno</Form.Label>
                                        <Form.Control
                                            id="apellidoP"
                                            type="text"
                                            placeholder="Primer apellido"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Apellido materno</Form.Label>
                                        <Form.Control
                                            id="apellidoM"
                                            type="text"
                                            placeholder="Segundo apellido"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CURP</Form.Label>
                                        <Form.Control
                                            id="curp"
                                            type="text"
                                            placeholder="CURP"
                                        />
                                    </Form.Group>
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
                            <Modal.Footer className="row align-items-stretch">
                                <div className="col d-grid gap-2">
                                    <Button type="button" variant="danger" className="mx-3" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </div>
                                <div className="col d-grid gap-2">
                                    <Button type="submit" variant="success" className="mx-3" onClick={handleSubmit}>
                                        Crear
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="container-body mt-5">
                <div className="table-responsive">
                    <table className="table table-hover table-borderless" id="paginationId">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Curp</th>
                                <th>Oficina</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="productTable" className="table-group-divider">
                            {userList.map((clients) => {
                                return (
                                    <tr key={clients.id}>
                                        <td>{clients.name} {clients.lastName} {clients.secondSurname}</td>
                                        <td>{clients.curp}</td>
                                        <td>{officeList[clients.catOfficeId - 1]?.name}</td>
                                        <td>
                                            <Button type="button" id="btnV" value={clients.id} variant="outline-primary" onClick={() => {
                                                navigate('/userUpdate', {
                                                    state: {
                                                        id: clients.id,
                                                        name: clients.name,
                                                        lastName: clients.lastName,
                                                        secondSurname: clients.secondSurname,
                                                        curp: clients.curp,
                                                        catOfficeId: officeList[clients.catOfficeId - 1].name
                                                    }
                                                });
                                            }}>

                                                <EditIcon sx={{ fontSize: 20 }} /></Button>{' '}

                                            <Button type="button" variant="outline-danger" onClick={() => {
                                                var myHeaders = new Headers();
                                                myHeaders.append("Content-Type", "application/json");

                                                var raw = JSON.stringify({
                                                    "id": clients.id
                                                });

                                                var requestOptions = {
                                                    method: 'DELETE',
                                                    headers: myHeaders,
                                                    body: raw,
                                                    redirect: 'follow'
                                                };

                                                fetch("http://localhost:3000/api/client/delete", requestOptions)
                                                    .then(response => response.text())
                                                    .then(result => console.log(result))
                                                    .catch(error => console.log('error', error));
                                                Swal.fire({
                                                    title: 'Cliente eliminado',
                                                    icon: 'success',
                                                    confirmButtonText: 'OK'
                                                })
                                                show_clients();
                                            }}><DeleteIcon sx={{ fontSize: 20 }} /></Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >

    );
};

export default Users;
