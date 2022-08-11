import React, { useState, useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import $ from 'jquery';

const Office = () => {
    const navigate = useNavigate();
    const [officeList, setOfficeList] = useState([]);
    const [showInsert, setShowInsert] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleModalInsert = () => {
        setShowInsert(!showInsert);
    }

    const handleModalEdit = () => {
        setShowEdit(!showEdit);
    }

    const list_office = async () => {

        const res = await fetch('http://localhost:3000/api/office/list');

        res.json()
            .then(res => {
                setOfficeList(res);
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = async () => {

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

        const addOffice = await fetch('http://localhost:3000/api/office/create', request_json)
            .then(response => response.text())
            .then(result => {
                if (result === "Oficina registrada") {
                    Swal.fire({
                        title: 'Oficina registrada',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    handleModalInsert();
                    list_office();
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Registro inválido',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            });
    }

    const handleDelete = (props) => {
        console.log("Eliminar Oficina");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            "id": props.id
        });

        var request_json = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch('http://localhost:3000/api/office/delete', request_json)
            .then(response => response.text())
            .then((result) => {
                console.log(result);
                Swal.fire({
                    title: 'Oficina Eliminada',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                list_office();
            });
    }

    const columns = [
        { dataField: "id", text: "Id", sort: true },
        { dataField: "name", text: "Nombre de la Oficina", sort: true, filter: textFilter() }
    ]

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

    useEffect(() => {
        list_office();
    }, []);

    return (
        <div className='container my-5'>
            <div className='container-wrapeer'>
                <div className='container-head'>
                    <div className='row g-0'>
                        <div className='col-sm-3 col-md-3 mx-auto'>
                            <h3>Lista de Oficinas</h3>
                        </div>
                        <div className='col-sm-3 col-md-3 mx-auto'>
                            <div className='search-box'>
                                <input type={"text"} onKeyUp={searching} className="form-control" id="search" placeholder='Buscar oficina' />
                            </div>
                        </div>
                        <div className='col sm-3 col-md-3 mx-auto text-end'>
                            <button type='button' className='btn btn-primary' onClick={() => handleModalInsert()}>
                                Agregar Oficina
                            </button>
                            <Modal
                                size={"sm"}
                                show={showInsert}
                                onHide={() => setShowInsert()}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id='example=modal-sizes-title-sm'>
                                        Nueva oficina
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Nombre de la oficina</Form.Label>
                                            <Form.Control
                                                id='office'
                                                type='name'
                                                placeholder='Oficina'
                                                autoFocus
                                            ></Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button type='button' className='btn btn-danger' onClick={() => handleModalInsert()}>
                                        Cancelar
                                    </button>
                                    <button type='button' className='btn btn-success' onClick={handleSubmit}>
                                        Agregar
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className='container-body mt-5'>
                    <div className='table-responsive'>
                        <table className='table table-stripped table-hover table-borderless tex-center' id=''>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre de la Oficina</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id='productTable'>
                                {officeList.map((office) => {
                                    return (
                                        <tr key={office.id}>
                                            <td>{office.id}</td>
                                            <td>{office.name}</td>
                                            <td>
                                                <button type='button' className='btn btn-primary'>Editar</button>
                                                <button type='button' className='btn btn-danger ml-2' onClick={() => handleDelete(office)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Office;