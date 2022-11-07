import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
function NuevoPassword() {

  const [ tokenValido, setTokenValido ] = useState(false) 
  const [ alerta, setAlerta ] = useState({}) 
  const [ password, setPassword ] = useState("")
  const [ repetirPassword, setRepetirPassword ] = useState("")
  const [ passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()

  useEffect(() => {
    const comprobarToken = async () => {

      try {
        await clienteAxios.get(`/usuarios/olvide-password/${params.token}`)
        setTokenValido(true)
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])
  
  const { msg } = alerta

  const handleSubmit = async e => {
    e.preventDefault()
    if([password, repetirPassword].includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    if(password !== repetirPassword){
      setAlerta({
        msg: "Las Contraseñas no son Iguales",
        error: true
      })
      return
    }
    if(password.length < 6){
      setAlerta({
        msg: "La Contraseña debe tener al menos 6 caracteres",
        error: true
      })
      return
    }

    setAlerta({})

    //Enviar contraseña nueva
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${params.token}`, { password })

      setAlerta({ msg: data.msg})
      setPassword("")
      setRepetirPassword("")
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      
    }
    setPasswordModificado(true)
  }
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Reestablece tu Contraseña y no pierdas Acceso a tus{' '}
      <span className="text-slate-700">Proyectos</span></h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form 
          className="my-10 bg-white shadow rounded-md p-10"
          onSubmit={handleSubmit}
        >
        <div className="my-5">
          <label 
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña:</label>
          <input 
          id="password"
          type="password" 
          placeholder="Ingrese su Nueva Contraseña" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label 
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña:</label>
          <input 
          id="password2"
          type="password" 
          placeholder="Ingrese Nuevamente su Contraseña" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={repetirPassword}
          onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>
        
        <input 
          type="submit"
          value="Guardar nueva Contraseña" 
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      ) }
      {passwordModificado && (
          <Link 
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/">Inicia Sesión
        </Link>
        )}
    </>
  )
}

export default NuevoPassword