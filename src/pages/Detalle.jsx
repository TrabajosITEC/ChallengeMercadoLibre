import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Detalle() {

  const location = useLocation();
  const [results, setResults] = useState({});
  const id = new URLSearchParams(location.search).get('id');
  console.log(id)
  
  useEffect(() => {
    const fetchResults = async () => {
    
      try {
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const data = await response.json();
        console.log(data)
        setResults(data)
       
      } catch (error) {
        console.error('Error en busqueda de elementos:', error);
      } 
    };

    if (id) {
      fetchResults();
    }
  }, [id]); // Se va a ejecutar cada vez que se modifique valor buscado!!


  return (
    <MainLayout>
        <div>
        <h1>Detalle del producto</h1>
        <p>ID del producto: {id}</p>
        <h1>{results.title}</h1>
        <h1>{results.description}</h1>
        <h1>{results.price}</h1>
        <img src={results.pictures? results.pictures[5].secure_url :"" } alt="" />
       
        </div>

    </MainLayout>
  );
};


