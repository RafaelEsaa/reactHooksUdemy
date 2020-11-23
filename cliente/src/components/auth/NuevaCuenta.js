import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";

const NuevaCuenta = () => {
	//extraer los valores del context
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	//state para iniciar sesion
	const [usuario, guardarUsuario] = useState({
		nombre: "",
		email: "",
		password: "",
		confirmar: "",
	});

	//extraer de usuario
	const { nombre, email, password, confirmar } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault(e);
		//Validar que no haya campos vacios
		if (
			nombre.trim() === "" ||
			email.trim() === "" ||
			password.trim() === "" ||
			confirmar.trim() === ""
		) {
			mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
		}

		//Password minimo de 6 caracteres
		if (password.length < 6) {
			mostrarAlerta(
				"El password debe ser minimo de 6 caracteres",
				"alerta-error"
			);
		}
		
		//Los 2 passwords sean iguales
		if(password !== confirmar) {
			mostrarAlerta(
				"Los passwords no son iguales",
				"alerta-error"
			);
		}
		//Pasarlo al action
	};

	return (
		<div className="form-usuario">
			{alerta ? (
				<div className={`${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className="contenedor-form sombra-dark">
				<h1>Obtener una cuenta</h1>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="campo-form">
						<label htmlFor="email">Nombre</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Tu nombre"
							value={nombre}
							onChange={() => onChange()}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Tu email"
							value={email}
							onChange={() => onChange()}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Tu password"
							value={password}
							onChange={() => onChange()}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Confirmar password</label>
						<input
							type="password"
							id="confirmar"
							name="confirmar"
							placeholder="Repite tu password"
							value={confirmar}
							onChange={() => onChange()}
						/>
					</div>
					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Registrarme"
						/>
					</div>
				</form>
				<Link to={"/nueva-cuenta"} className="enlace-cuenta">
					Iniciar sesión
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
