import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { useLocation } from 'react-router-dom';

const Detalle = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  console.log(id)
  
  return (
    <MainLayout>
        <div>
        <h1>Detalle del producto</h1>
        <p>ID del producto: {id}</p>
        {/* Aquí puedes agregar lógica para mostrar los detalles del producto basado en el ID */}
        </div>
    </MainLayout>
  );
};

export default Detalle;