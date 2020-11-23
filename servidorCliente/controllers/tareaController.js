const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//Crear una nueva tarea
exports.crearTarea = async (req, res) => {
	//Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty) {
		return res.status(400).json({ errores: errores.array() });
	}

	//Extraer el proyecto y comprobar si existe
	try {
		const { proyecto } = req.body;
		const existeProyecto = await Proyecto.findById(proyecto);
		if (!existeProyecto) {
			return res.status(404).send({ msg: "El proyecto no fue encontrado" });
		}

		//Revisar si el proyecto actual pertenece al usuario autenticado
		if (req.usuario.id !== existeProyecto.creador.toString()) {
			return res.status(401).send({ msg: "No autorizado" });
		}

		//Creamos la tarea
		const tarea = new Tarea(req.body);
		await tarea.save();
		res.json({ tarea });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

//Obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
	//ID del proyecto
	const { proyecto } = req.body;

	try {
		const existeProyecto = await Proyecto.findByIdAndUpdate(proyecto);
		if (!existeProyecto) {
			return res.status(404).send({ msg: "Proyecto no encontrado" });
		}

		//Revisar si el proyecto pertenece al usuario autenticado
		if (req.usuario.id !== existeProyecto.creador.toString()) {
			return res.status(401).send({ msg: "No autorizado" });
		}

		//Obtener las tareas por proyecto
		const tareas = await Tarea.find({ proyecto: proyecto });
		res.json({ tareas });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

exports.actualizarTarea = async (req, res) => {
	try {
		//Extraer el proyecto y comprobar si existe
		const { proyecto, nombre, estado } = req.body;

		//Si la tarea existe o no
		let tarea = Tarea.findById(req.params.id);
		if (!tarea) {
			return res.status(404).send({ msg: "No existe" });
		}

		const existeProyecto = await Proyecto.findById(proyecto);

		//Revisar si el proyecto pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).send({ msg: "No autorizado" });
		}

		//Crear un objeto con la nueva informacion
		const nuevaTarea = {};
		if (nombre) {
			nuevaTarea.nombre = nombre;
		}
		if (estado) {
			nuevaTarea.estado = estado;
		}

		//Guardar la tarea
		tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
			new: true,
		});
		res.json({ tarea });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

exports.eliminarTarea = async (req, res) => {
	try {
		//Extraer el proyecto y comprobar si existe
		const { proyecto } = req.body;

		//Si la tarea existe o no
		let tarea = Tarea.findById(req.params.id);
		if (!tarea) {
			return res.status(404).send({ msg: "No existe" });
		}

		const existeProyecto = await Proyecto.findById(proyecto);

		//Revisar si el proyecto pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).send({ msg: "No autorizado" });
		}

		//Eliminar
		await Tarea.findOneAndRemove({ _id: req.params.id });
		res.json({ msg: "Tarea eliminada" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};
