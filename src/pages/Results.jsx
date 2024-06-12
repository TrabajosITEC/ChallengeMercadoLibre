import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import { ProgressSpinner } from 'primereact/progressspinner';
import '../index.css';
import { Paginator } from 'primereact/paginator';
import Card from '../components/Card';

export default function Results() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0); // Estado para la posición inicial de la paginación
  const [rows, setRows] = useState(5); // Estado para el número de registros por página
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

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  }

  const paginatedResults = results.slice(first, first + rows); // Filtra los resultados para la página actual

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
        <h1>Resultados de búsqueda: {valorBuscado}</h1>
        <Card info={paginatedResults}/>
        <Paginator first={first} rows={rows} totalRecords={results.length} onPageChange={onPageChange} />
      </div>
    </MainLayout>
  );
}
