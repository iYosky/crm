import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      <div className="flex-1"></div>
      <nav className="bg-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-white">
                <h2 className="text-2xl font-bold">CRM-Clientes</h2>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                className={`${location.pathname === '/' ? 'text-white' : 'text-gray-400'} text-xl hover:text-gray-300`}
                to={'/'}
              >
                Clientes
              </Link>
              <Link
                className={`${location.pathname === '/clientes/nuevo' ? 'text-white' : 'text-gray-400'} text-xl hover:text-gray-300`}
                to={'/clientes/nuevo'}
              >
                Nuevo Cliente
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="md:flex md:min-h-screen">
        <h2 className="sr-only">CRM-Clientes</h2>
        <main className="p-10 md:flex-1 md:h-screen overflow-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
