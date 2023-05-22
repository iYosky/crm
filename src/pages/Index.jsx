import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente"
import {getClientes} from '../data/clientes'



const Index = () => {

  const [search, setSearch] = useState('')
  const clientes = useLoaderData(getClientes)

  //filtrar por nombre 
  const filteredClientes = clientes.filter((cliente) => cliente.nombre.includes(search))


  return (
    <>
    <h1 className="font-black text-4xl text-gray-500 text-center">Clientes</h1>
    <p className="mt-3 text-center">Administra tus clientes</p>
    <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" mt-5 p-2 border-gray-400 border-2 rounded-md text-center mx-auto "
      />
    {filteredClientes.length ? (
      <table className="w-full bg-gray-300 shadow mt-5 table-auto">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Cliente</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Acciones</th>
          </tr>
          </thead>
          <tbody>
            {filteredClientes.map(cliente => (
              <Cliente
              cliente = {cliente}
              key={cliente.id}/>
            ))}
          </tbody>
       
      </table>
      ) : (
      <p>No hay clientes para mostrar</p>
    )}
    </>
  )
}
export default Index