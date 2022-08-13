import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import '../style/userUpdate.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

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
        <div className="container-Update col-sm-4 col-md-4 mx-auto">
            <form>
                <div className='mgTop'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Nombre(s)</label>
                        <input type="text" className="form-control" id="nombre" defaultValue={name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Apellido paterno</label>
                        <input type="text" className="form-control" id="apellidoP" defaultValue={lastName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Apellido materno</label>
                        <input type="text" className="form-control" id="apellidoM" defaultValue={secondSurname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Apellido materno</label>
                        <input type="text" className="form-control" id="curp" defaultValue={curp} />
                    </div>
                    <div className="form-group col-mb-3">
                        <label htmlFor="inputState">Oficina</label>
                        <select id="oficina" className="form-control" defaultValue={catOfficeId}>
                            {officeList.map((item) =>
                                <option key={item.id}>{item.name}</option>
                            )};
                        </select>
                    </div>
                    <button className='btn btn-danger' onClick={() => {
                        navigate('/');
                    }}>Cancelar</button>
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


    )
}

export default UserUpdate;