import React, { useContext, useState, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext
    const tareasContext = useContext(tareaContext)
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext

    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [])

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })
    //Extraer el nombre del proyecto
    const { nombre } = tarea

    //Si no hay proyecto seleccionado
    if (!proyecto) return null

    //Array destructuring para extraer el proyecto seleccionado
    const [proyectoActual] = proyecto

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        //Validar
        if (nombre.trim() === '') {
            validarTarea();
            return
        }
        //Si es edicion o es nueva tarea
        if (tareaseleccionada === null) {
            //Agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id
            tarea.estado = false
            agregarTarea(tarea)
        } else {
            actualizarTarea(tarea)
            //Elimina tareaseleccionada del state
            limpiarTarea()
        }

        //Obtener y filtrar las tareas las proyecto actual
        obtenerTareas(proyectoActual.id)
        //Reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTarea;