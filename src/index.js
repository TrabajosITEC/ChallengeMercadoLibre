import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                        
import 'primeflex/primeflex.css';                     
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ModeProvider } from './contexts/MainContext';
import Home from './pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([

  {
    path: "/",
    element: <Home/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ModeProvider>
    <RouterProvider router={router} />
  </ModeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
