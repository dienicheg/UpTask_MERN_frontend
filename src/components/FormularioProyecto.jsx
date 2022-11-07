import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'

function FormularioProyecto() {
    const [ id, setId ] = useState(null)
    const [ nombre, setNombre ] = useState('')
    const [ descripcion, setDescripcion ] = useState('')
    const [ fechaEntrega, setFechaEntrega ] = useState('')
    const [ cliente, setCliente ] = useState('')
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    const params = useParams();
    useEffect(() => {
      if(proyecto.nombre){
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
        setCliente(proyecto.cliente)
      }
    }, [params])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return 
        }
        mostrarAlerta({})
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }
    const { msg } = alerta
  return (  
    <form 
        className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
    >
        {msg && <Alerta alerta={alerta} />}
        <div>
            <label 
                htmlFor="nombre" 
                className='text-gray-700 uppercase font-bold text-sm'
            >Nombre Proyecto</label>
            <input 
                type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='nombre'
                placeholder='Ingrese nombre del proyecto'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className='mt-3'>
            <label 
                htmlFor="descripcion" 
                className='text-gray-700 uppercase font-bold text-sm'
            >Descripción</label>
            <textarea 
                type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='descripcion'
                placeholder='Ingrese descripción del proyecto'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <div className='mt-3'>
            <label 
                htmlFor="fecha-entrega" 
                className='text-gray-700 uppercase font-bold text-sm'
            >Fecha de Entrega</label>
            <input 
                type="date" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='fecha-entrega'
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>
        <div className='mt-3'>
            <label 
                htmlFor="cliente" 
                className='text-gray-700 uppercase font-bold text-sm'
            >Cliente</label>
            <input 
                type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='cliente'
                placeholder='Ingrese cliente del proyecto'
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />
        </div>
        <input 
            type="submit" 
            className='bg-sky-600 text-gray-100 w-full p-3 uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors mt-3'
            value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        />
    </form>
  )
}

export default FormularioProyecto