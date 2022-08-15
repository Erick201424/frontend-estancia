import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

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
        <div className="container my-5 shadow-lg p-3 bg-body">
            <div className="container-title text-center">
                <h3 className="fw-bold">Lista de Oficinas</h3>
            </div>
            <div className="container-head mt-3">
                <div className="row align-items-stretch">
                    <div className="d-grid gap-2 col-sm-3 col-md-3 my-3 text-start">
                        <Button type="button" variant="info" className="mx-4" onClick={() => {
                            navigate('/')
                        }}>
                            Ir a clientes
                        </Button>
                    </div>
                    <div className="col-sm-3 col-md-6 my-3 text-center">
                        <div className="search-box mx-5">
                            <input type={"text"} onKeyUp={searching} className="form-control" id="search" placeholder="Buscar" />
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-sm-3 col-md-3 my-3 text-end">
                        <Button type="button" variant="primary" className="mx-4" onClick={() => setSmShow(true)}>
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
                            <Modal.Footer className="row align-items-stretch">
                                <div className="col d-grid gap-2">
                                    <Button type="button" variant="danger" onClick={() => setSmShow(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                                <div className="col d-grid gap-2">
                                    <Button type="submit" variant="success" onClick={handleAddOffice}>
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
                                <th>Oficina</th>
                            </tr>
                        </thead>
                        <tbody id="productTable">
                            {officeList.map((office) => {
                                return (
                                    <tr key={office.id}>
                                        <td>{office.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div >
    );

}

export default Offices;