import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                        
import 'primeflex/primeflex.css';                     
import './index.css';
import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ModeProvider } from './contexts/MainContext';
import Home from './pages/Home';
import Results from './pages/Results';
import Detalle from './pages/Detalle';
import Carrito from './pages/Carrito';
import PagoyEnvioCarrito from './pages/PagoyEnvioCarrito';
import PagoyEnvio from './pages/PagoyEnvio';
import MisCompras from './pages/MisCompras';

const primeConfig = {
  ripple: true,
  inputStyle: 'outlined',
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/results",
    element: <Results />
  },
  {
    path: "/detalle",
    element: <Detalle/>
  },
  {
    path: "/carrito",
    element: <Carrito/>
  },
  {
    path: "/pagoYenvio",
    element: <PagoyEnvio/>
  },
  {
    path: "/pagoYenvioCarrito",
    element: <PagoyEnvioCarrito/>
  },
  {
    path: "/misCompras",
    element: <MisCompras/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PrimeReactProvider value={primeConfig}>
    <ModeProvider>
      <RouterProvider router={router} />
    </ModeProvider>
  </PrimeReactProvider>
);

reportWebVitals();
