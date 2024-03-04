import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logoOCEANOM.png"
// import { Login } from "../pages/login";

export const Navbar = () => {

    const { store, actions } = useContext(Context)
    let location = useLocation();

    // const isLoggedIn = store.loggedUSer !== null; //creamos const para saber si el user esta logeado
    const [isLoggedIn, setIsLoggedIn] = useState(store.loggedUSer !== null);

    // el dropdown no se cierra automaticamente, usaremos useRef para cerrarlo forzado 
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Actualizar el estado de isLoggedIn después de cambios en el store
        setIsLoggedIn(store.loggedUSer !== null);
    }, [store.loggedUSer]);

    const handleLogout = () => {
       if (dropdownRef.current) {
            // Cerrar el Dropdown manualmente
            const dropdown = new window.bootstrap.Dropdown(dropdownRef.current);
            dropdown.hide();
        actions.logout();
    };
    }
    return (
        //<nav className="navbar p-0">
        <>
            {location.pathname !== "/" && (
                <nav
                    id="navbar"
                    className="navbar navbar-expand-lg navbar-dark fixed-top mb-2"
                    style={{ backgroundColor: "#1D77AB" }}>
                    <div className="container mt-1 ms-2 col-lg-12 col-md-6 col-sm-6">
                        <Link to="/">
                            <img src={logo} className="card-img-top" alt="..." style={{ width: "50%" }} />
                        </Link>
                        {/* dropdown para dispositivos moviles, menu responsive */}

                        <div className="ml-auto me-0">
                            <div className="d-flex justify-content-end d-sm-flex d-md-none gap-3">
                                <div className="dropdown">
                                    <button className="btn text-light btn-lg dropdown-toggle" type="button" id="mobiledropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="mobiledropdownMenuButton">
                                        <Link to="/sessions" className="dropdown-item">Sessions</Link>
                                        <Link to="/theteachers" className="dropdown-item">The Teachers</Link>
                                        <Link to="/signup" className="dropdown-item">Signup</Link>
                                        <Link to="/login" className="dropdown-item">Login</Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul className="nav col-lg-12 col-md-12 col-sm-12 d-flex flex-md-row flex-column align-items-start">
                                    <li className="nav-item">
                                        <Link to="/sessions">
                                            <span className="nav-link active text-light" aria-current="page">
                                                Sessions
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/theteachers">
                                            <span className="nav-link text-light">The Teachers</span>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                    <Link to="/">
                                    <span className="nav-link text-light">Log In</span>
                                    </Link>
                                </li> */}
                                    {/* Si el usuario no esta logeado, aparecerán estos links */}
                                    {!isLoggedIn ? (
                                        // añadimos <> para poder meter los dos li sin necesidad de añadir un div
                                        <>
                                            <li className="nav-item">
                                                <Link to="/signup">
                                                    <span className="nav-link text-light">Signup</span>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/signup/freetrial">
                                                    <span className="nav-link text-light">Free trial</span>
                                                </Link>
                                            </li>
                                        </>
                                    ) : (null)}
                                    {isLoggedIn ? (
                                        <div className="dropdown">
                                            <button className="btn text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="nav-link fa-regular fa-user text-light"></i>
                                            </button>
                                            <div className="dropdown-menu bg-light opacity-75" aria-labelledby="dropdownMenuButton">
                                                <Link to="/profile" className="dropdown-item">Your profile</Link>
                                                <Link to="/" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                            </div>
                                        </div>
                                    ) : (
                                        // Si el usuario no está logeado, mostrar opciones de inicio de sesión
                                        <li className="nav-item">
                                            <Link to="/login">
                                                <span className="nav-link text-light">Login</span>
                                            </Link>
                                        </li>
                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};
