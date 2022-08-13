import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';

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
        <div className="container my-5">
            <div className="container-wrapper">
                <div className="container-head">
                    <div className="row ow-cols-2 row-cols-lg-5 g-2 g-lg-3">
                        <div className="col-sm-4 col-md-4 mx-auto">
                            <h3>Lista de Clientes</h3>
                        </div>
                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <div className="search-box">
                                <input type={"text"} onKeyUp={searching} className="form-control" id="search" placeholder="Buscar" />
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <Button variant="info" onClick={() => {
                                navigate('/office')
                            }}>
                                Ir a oficinas
                            </Button>
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
                                            <td>
                                                <Button id="btnV" value={clients.id} variant="primary" onClick={() => {
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

                                                    <EditIcon sx={{ fontSize: 20 }} color="success" /></Button>

                                                <Button onClick={() => {
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
                                                        title: 'Cliente eliminado exitosamente',
                                                        icon: 'success',
                                                        confirmButtonText: 'OK'
                                                    })
                                                    show_clients();
                                                }}><DeleteIcon sx={{ fontSize: 20, color: pink[500] }} /></Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div >
        </div >

    );
};

export default Users;
