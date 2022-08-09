import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = () => {
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
                        <div className="col-sm-4 col-md-4 mx-auto text-end">
                            <button type="button" className="btn btn-primary">Agregar cliente</button>
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
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
