import { useNavigate, Form, redirect } from "react-router-dom";
import { deleteCliente } from "../data/clientes";

export async function action({ params }) {
  await deleteCliente(params.id);
  return redirect("/");
}

const Cliente = ({ cliente }) => {
  const navigate = useNavigate();
  const { id, nombre, phone, email, empresa } = cliente;

  return (
    <tr className="border-b">
      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800 text-center">{nombre}</p>
        <p className=" text-center">{empresa}</p>
      </td>
      <td className="p-2  text-center">
        <p className="text-gray-600">
          {" "}
          <span className="text-gray-800 uppercase font-bold">Email:</span>{" "}
          {email}
        </p>
        <p className="text-gray-600">
          {" "}
          <span className="text-gray-800 uppercase font-bold">
            Telefono:
          </span>{" "}
          {phone}
        </p>
      </td>
      <td className="  text-center">
        <button
          onClick={() => navigate(`/clientes/${id}`)}
          type="button"
          className="text-green-600 uppercase font-bold mr-6 ml-6"
        >
          Ver Notas
        </button>
        
        <Form className="inline-block"
          method="post"
          action={`clientes/${id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm("Deseas eliminar este registro?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 uppercase font-bold mr-6 ml-6 inline-block"
            
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};
export default Cliente;
