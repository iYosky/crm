import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCliente, {
  action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import ClienteInfo, { loader as verClienteAction, action as nuevaNotaAction} from "./pages/ClienteInfo";
import Index from "./pages/Index";
import { getClientes } from "./data/clientes";
import { action as eliminarClienteAction } from "./components/Cliente";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Index />,
          loader: getClientes,
        },
        {
          path: "/clientes/nuevo",
          element: <NuevoCliente />,
          action: nuevoClienteAction,
        },
        {
          path: "/clientes/:id",
          element: <ClienteInfo />,
          loader: verClienteAction,
          action: nuevaNotaAction
        },
        { path: "/clientes/:id/eliminar", action: eliminarClienteAction },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
