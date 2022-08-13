import React from 'react';
import { useLocation } from 'react-router-dom'
import '../style/officeUpdate.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function UserUpdate() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id, name } = state;

    return (
        <div className="container-Update col-sm-4 col-md-4 mx-auto">
            <form>
                <div className='mgTop'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Nombre</label>
                        <input type="text" className="form-control" id="nombre" defaultValue={name} />
                    </div>
                    <div className='row'>

                    </div>
                    <div className="col-md-9 col-md-offset-9 col-xs-12 text-right">
                        <div className="btn-group" role="group">
                        <button className='btn btn-danger' onClick={() => {
                            navigate('/office');
                        }}>Cancelar</button>
                            <button type="submit" className="btn btn-success" onClick={() => {
                                var myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");
                                var name = document.getElementById('nombre').value;

                                var raw = JSON.stringify({
                                    id: id,
                                    name: name
                                });

                                var requestOptions = {
                                    method: 'PUT',
                                    headers: myHeaders,
                                    body: raw,
                                    redirect: 'follow'
                                };

                                fetch("http://localhost:3000/api/office/update", requestOptions)
                                    .then(response => response.text())
                                    .then(result => console.log(result))
                                    .catch(error => console.log('error', error));
                                Swal.fire({
                                    title: 'Datos de la oficina actualizada exitosamente',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                })
                                navigate('/office');
                            }}>Actualizar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserUpdate;