import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const ListadoTareas = () => {
    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext
    //Obtener las tareas
    const tareasContext = useContext(tareaContext)
    const { tareasproyecto } = tareasContext

    //Si no hay proyecto seleccionado
    if (!proyecto) return <h2>Selecciona un proyecto</h2>

    //Array destructuring para extraer el proyecto seleccionado
    const [proyectoActual] = proyecto

    //Elimina un proyecto
    const onClickEliminar = (proyecto) => {
        eliminarProyecto(proyectoActual.id)
    }
    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasproyecto.map((tarea, key) => (
                            <CSSTransition
                                key={key}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
}

export default ListadoTareas;