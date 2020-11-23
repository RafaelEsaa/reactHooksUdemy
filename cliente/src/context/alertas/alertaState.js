import React, { useReducer } from "react";
import alertaReducer from "../alertas/alertaReducer";
import alertaContext from "../alertas/alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
	const initialState = {
		alerta: null,
	};

	const [state, dispatch] = useReducer(alertaReducer, initialState);

	const mostrarAlerta = (msg, categoria) => {
		console.log("datos: ", msg, categoria);
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				categoria,
			},
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 5000);
	};

	return (
		<alertaContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta,
			}}
		>
			{props.children}
		</alertaContext.Provider>
	);
};

export default AlertaState;
