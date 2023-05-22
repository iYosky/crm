import { getCliente } from "../data/clientes"

export async function loader ({params}){
const cliente = await getCliente(params.id)
console.log(cliente)
}

const EditarCliente = () => {


  return (
    <div>EditarCliente</div>
  )
}
export default EditarCliente