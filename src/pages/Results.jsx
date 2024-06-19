import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import MainLayout from "../layouts/MainLayout";
import CardProductos from '../components/CardProductos';
import '../index.css';

export default function Results() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0); 
  const [rows, setRows] = useState(5); 
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const valorBuscado = new URLSearchParams(location.search).get('param');
  const sortOptions = [
    { label: 'Mayor a Menor', value: '!price' },
    { label: 'Menor a Mayor', value: 'price' }
  ];

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${valorBuscado}`);
        const data = await response.json();
        console.log(data)
        setResults(data.results);
        setFirst(0);
        setRows(5);

      } catch (error) {
        console.error('Error en busqueda de elementos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (valorBuscado) {
      fetchResults();
    }
  }, [valorBuscado]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  }

  const onSortChange = (event) => {
    const value = event.value;
    let _sortOrder = 0;
    let _sortField = '';

    if (value.indexOf('!') === 0) {
      _sortOrder = -1;
      _sortField = value.substring(1);
    } else {
      _sortOrder = 1;
      _sortField = value;
    }

    const sortedResults = [...results].sort((a, b) => {
      if (a[_sortField] < b[_sortField]) {
        return -1 * _sortOrder;
      }
      if (a[_sortField] > b[_sortField]) {
        return 1 * _sortOrder;
      }
      return 0;
    });

    setSortOrder(_sortOrder);
    setSortField(_sortField);
    setSortKey(value);
    setResults(sortedResults);
  };

  const paginatedResults = results.slice(first, first + rows); 
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
      <div className='grid flex-wrap: wrap text-center '>
        <div className='row flex flex-row'>

          <div className='col-3'>
            <h2>"{valorBuscado}"</h2>
            <p>{results.length} resultados encontrados</p>
            <Dropdown
              options={sortOptions}
              value={sortKey}
              optionLabel="label"
              placeholder="Ordenar por precio"
              onChange={onSortChange}
              className="w-full sm:w-14rem"
            />
          </div>

          <div className='col-9'>      
            <CardProductos info={paginatedResults}/>
          </div>

        </div>
      </div>
            <Paginator first={first} rows={rows} totalRecords={results.length} onPageChange={onPageChange} />
    </MainLayout>
  );
}
