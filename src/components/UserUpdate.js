import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import '../style/userUpdate.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import bgEdit from "../resources/bg-edit.svg"

function UserUpdate() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { id, name, lastName, secondSurname, curp, catOfficeId } = state;
    const [officeList, setOfficeList] = useState([]);
    const show_offices = async () => {
        const get_office = await fetch('http://localhost:3000/api/office/list');

        get_office.json()
            .then(res => setOfficeList(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        show_offices();
    }, [])

    return (
        <div className="container-update align-items-center py-5 bg-gray-100 vh-100">
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-6 px-lg-4'>
                        <div className='card'>
                            <div className='card-header px-lg-5 mt-3 '>
                                <div className='row align-items-stretch'>
                                    <div className='col-sm-3 col-md-4 col-lg-4'>
                                        <button type='button' className='btn btn-danger' onClick={() => {
                                            navigate('/');
                                        }}>Cancelar</button>
                                    </div>
                                    <div className='col-sm-9 col-md-8 col-lg-8'>
                                        <div className='fw-bold'>
                                            <h4 className='fw-bold'>Actualizar cliente</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body p-lg-5'>
                                <form>
                                    <div className="form-group form-floating mb-3">
                                        <input type={"text"} className="form-control" id="nombre" defaultValue={name} />
                                        <label htmlFor="nombre">Nombre(s)</label>
                                    </div>
                                    <div className='row g-2 mb-3'>
                                        <div className='col'>
                                            <div className='form-group form-floating'>
                                                <input type={"text"} className="form-control" id="apellidoP" defaultValue={lastName} />
                                                <label htmlFor="apellidoP">Apellido Paterno</label>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='form-group form-floating'>
                                                <input type={"text"} className="form-control" id="apellidoM" defaultValue={secondSurname} />
                                                <label htmlFor="apellidoM">Apellido Materno</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group form-floating mb-3">
                                        <input type="text" className="form-control" id="curp" defaultValue={curp} />
                                        <label htmlFor="curp">CURP</label>
                                    </div>
                                    <div className="form-group form-floating mb-3">
                                        <div className="form-group col-mb-3">
                                            <label htmlFor="inputState">Oficina</label>
                                            <select id="oficina" className="form-select" defaultValue={catOfficeId}>
                                                {officeList.map((item) =>
                                                    <option key={item.id}>{item.name}</option>
                                                )};
                                            </select>
                                        </div>
                                    </div>
                                    <div className='d-grid gap-2 md-block'>
                                        <button type="submit" className="btn btn-success" onClick={() => {
                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var name = document.getElementById('nombre').value;
                                            var apellidoP = document.getElementById('apellidoP').value;
                                            var apellidoM = document.getElementById('apellidoM').value;
                                            var curp = document.getElementById('curp').value;
                                            var oficina = (document.getElementById('oficina').selectedIndex) + 1;

                                            var raw = JSON.stringify({
                                                id: id,
                                                name: name,
                                                lastName: apellidoP,
                                                secondSurname: apellidoM,
                                                curp: curp,
                                                catOfficeId: oficina
                                            });

                                            var requestOptions = {
                                                method: 'PUT',
                                                headers: myHeaders,
                                                body: raw,
                                                redirect: 'follow'
                                            };

                                            fetch("http://localhost:3000/api/client/update", requestOptions)
                                                .then(response => response.text())
                                                .then(result => console.log(result))
                                                .catch(error => console.log('error', error));
                                            Swal.fire({
                                                title: 'Datos del cliente actualizado exitosamente',
                                                icon: 'success',
                                                confirmButtonText: 'OK'
                                            })
                                            navigate('/');
                                        }}>Actualizar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center">
                        <img className="img-fluid mb-4" width="500" src={bgEdit} alt="" />
                    </div>
                </div>
            </div>
        
        </div>


    )
}

export default UserUpdate;