import { useState, useEffect } from 'react'
import {useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

function ConfirmarCuenta() {
  const params = useParams()
  const { id } = params

  const [ alerta, setAlerta ] = useState({})
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false)

  useEffect(() => {
 
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar/${id}`) 
        setAlerta({
          msg: data.msg
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])
  const {msg} = alerta
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Crear tus{' '}
      <span className="text-slate-700">Proyectos</span></h1>
      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta}></Alerta>}
        {cuentaConfirmada && (
          <Link 
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/">Inicia Sesión
        </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta