import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import { ProgressSpinner } from 'primereact/progressspinner';
import '../index.css';
import BasicDemo from '../components/card';

export default function Results() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const valorBuscado = new URLSearchParams(location.search).get('param'); //El .search es una prop del hook location.

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${valorBuscado}`);
        const data = await response.json();
        console.log(data)
        setResults(data.results);

      } catch (error) {
        console.error('Error en busqueda de elementos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (valorBuscado) {
      fetchResults();
    }
  }, [valorBuscado]); // Se va a ejecutar cada vez que se modifique valor buscado!!

  if (loading) {
    return (
      <div className='loadingContainer'>
        <h3>Buscando...</h3>
        <ProgressSpinner />
      </div>
    )
    
  }
  return (
    <MainLayout>
        <div>
        <h1>Resultados de busqueda: {valorBuscado}</h1>
        
            {results.map((result) => (
            <BasicDemo titulo= {result.title} precio = {result.price} />   
            ))}
        {/* TODO: Reemplazar la lista por el componente que muestre los productos */}
        </div>
    </MainLayout>
  );
}
