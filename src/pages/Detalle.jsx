import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Galeria from '../components/Galeria';
import { Avatar } from 'primereact/avatar';

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
          <h1>{results.title}</h1>       
          <Galeria info={results.pictures? results.pictures : []}></Galeria>
        </div>

    </MainLayout>
  );
};


