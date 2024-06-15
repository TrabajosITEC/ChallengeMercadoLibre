import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                        
import 'primeflex/primeflex.css';                     
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ModeProvider } from './contexts/MainContext';

import Home from './pages/Home';
import Results from './pages/Results';
import Detalle from './pages/Detalle';
import Carrito from './pages/Carrito';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';


const primeConfig = {
  ripple: true,
  inputStyle: 'outlined',
  // pt: {
  //   button: {
  //     root: { className: 'bg-teal-500 hover:bg-teal-700 cursor-pointer text-white p-3 border-round border-none flex gap-2' },
  //     label: 'text-white font-bold text-xl', // OR { className: 'text-white font-bold text-xl' }
  //     icon: 'text-white text-2xl'
  //   }
  // },
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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PrimeReactProvider value={primeConfig}>
    <ModeProvider>
      <RouterProvider router={router} />
    </ModeProvider>
  </PrimeReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
