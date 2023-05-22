import { useState, useEffect } from "react";
import { useLoaderData, redirect, Form } from "react-router-dom";
import { getCliente, addNota } from "../data/clientes";
import AgregarNota from "../components/AgregarNota";

export async function loader({ params }) {
  const cliente = await getCliente(params.id);
  console.log(cliente);
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  datos.creacion = new Date().toLocaleDateString(); // Agregar fecha de creación

  // Obtener el cliente existente
  const cliente = await getCliente(params.id);

  // Agregar la nueva nota al arreglo existente
  const nuevaNota = {
    titulo: datos.titulo,
    contenido: datos.notas,
    id: Date.now(), // Generar un ID único para cada nota
  };
  cliente.notas.push(nuevaNota);

  // Actualizar el cliente en la base de datos
  await addNota(params.id, cliente);

  return null;
}

const ClienteInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [notas, setNotas] = useState([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);

  const cliente = useLoaderData();

  useEffect(() => {
    if (cliente) {
      setNotas(cliente?.notas || []);
      setNotaSeleccionada(null);
    }
    setCargando(false);
  }, [cliente]);

  return (
    <>
      {cargando && <div>Cargando...</div>}
      {!cargando && (
        <div>
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <span className="block ml-2 font-bold text-gray-600 text-2xl">
                {cliente?.nombre}
              </span>
              <span className="inline-block  ml-2 font-bold text-gray-600 text-2xl">
                {cliente?.email}
              </span>
              <div className="ml-auto"><button
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Agregar Nueva Nota
      </button></div>
            </div>
          </div>
          <div>
            <ul className="space-y-2">
              {notas.map((nota) => (
                <li key={nota.id} className="flex justify-center">
                  <div
                    className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow cursor-pointer"
                    onClick={() => setNotaSeleccionada(nota)}
                  >
                    {nota.titulo}
                  </div>
                </li>
              ))}
            </ul>
            {notaSeleccionada && (
              <div className="justify-center flex mt-4 px-4 py-2 text-gray-700 rounded shadow">
                <span className="block">
                  <h3>{notaSeleccionada.titulo}</h3>
                  <span className="font-bold">
                    <p>{notaSeleccionada.contenido}</p>
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none m-12">
                <Form 
                onSubmit={() => setShowModal(false)}
                method="POST">
                  <AgregarNota />
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <input
                      type="submit"
                      className="w-full bg-gray-600 text-white p-3 uppercase font-bold tex-lg hover:bg-gray-800"
                      value="Registrar Cliente"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ClienteInfo;
