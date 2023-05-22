import { useNavigate, Form, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import { addCliente } from "../data/clientes"

export async function action({request}){
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  datos.creacion = new Date().toLocaleDateString(); // Agregar fecha de creación
  datos.notas = [
    {
      titulo: datos.titulo,
      contenido: datos.notas,
      id: 1, // Asigna un ID único para cada nota
    },
  ];
  await addCliente(datos)
  return redirect('/')
}


const NuevoCliente = () => {

  const navigate = useNavigate()

  return (
    <>
     <h1 className="font-black text-4xl text-gray-500 text-center">Nuevo Cliente</h1>
    <p className="mt-3 text-center">Llena todos los campos para registrar un nuevo cliente</p>
    
    <div className="bg-white shadow rounden-md md:w-3/4 mx-auto px-5 py-10 mt-14">
      <Form
      method="POST"
      >
      <Formulario/>
      <input type="submit"
      className="w-full bg-gray-600 text-white p-3 uppercase font-bold tex-lg hover:bg-gray-800"
      value="Registrar Cliente"
      />
      </Form>
      
    </div>
    <div className="flex justify-center mt-10">
      <button 
      onClick={() => navigate(-1)}
      className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">
      Volver
      </button>
    </div>
    </>
  )
}
export default NuevoCliente