import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';

const Offices = () => {
    const navigate = useNavigate()
    const [officeList, setOfficeList] = useState([]);
    const [smShow, setSmShow] = useState(false);

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
                    show_offices();
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
        show_offices();
    }, [])

    const show_offices = async () => {
        const get_office = await fetch('http://localhost:3000/api/office/list');

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
                            <h3>Lista de Oficinas</h3>
                        </div>
                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <div className="search-box">
                                <input type={"text"} onKeyUp={searching} className="form-control" id="search" placeholder="Buscar" />
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <Button variant="info" onClick={() => {
                                navigate('/')
                            }}>
                                Ir a clientes
                            </Button>
                        </div>

                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <Button variant="primary" onClick={() => setSmShow(true)}>
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
                        </div>
                    </div>
                </div>
                <div className="container-body mt-5">
                    <div className="table-responsive">
                        <table className="table table-stripped table-hover table-borderless" id="paginationId">
                            <thead>
                                <tr>
                                    <th>Oficina</th>
                                </tr>
                            </thead>
                            <tbody id="productTable">
                                {officeList.map((office) => {
                                    return (
                                        <tr key={office.id}>
                                            <td>{office.name}</td>
                                            <td className="text-end">
                                                <Button id="btnV" value={office.id} variant="primary" onClick={() => {
                                                    navigate('/officeUpdate', {
                                                        state: {
                                                            id: office.id,
                                                            name: office.name
                                                        }
                                                    });
                                                }}>

                                                    <EditIcon sx={{ fontSize: 20 }} color="success" /></Button>

                                                <Button onClick={() => {
                                                    var myHeaders = new Headers();
                                                    myHeaders.append("Content-Type", "application/json");

                                                    var raw = JSON.stringify({
                                                        "id": office.id
                                                    });

                                                    var requestOptions = {
                                                        method: 'DELETE',
                                                        headers: myHeaders,
                                                        body: raw,
                                                        redirect: 'follow'
                                                    };

                                                    fetch("http://localhost:3000/api/office/delete", requestOptions)
                                                        .then(response => response.text())
                                                        .then(result => console.log(result))
                                                        .catch(error => console.log('error', error));
                                                    Swal.fire({
                                                        title: 'Oficina eliminada exitosamente',
                                                        icon: 'success',
                                                        confirmButtonText: 'OK'
                                                    })
                                                    show_offices();
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

}

export default Offices;