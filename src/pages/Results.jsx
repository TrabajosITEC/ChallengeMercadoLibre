import React, { useEffect, useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import { ProgressSpinner } from 'primereact/progressspinner';
import '../index.css';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import CardProductos from '../components/CardProductos';
import { ModeContext } from '../contexts/MainContext';


export default function Results() {
  const { Modo} = useContext(ModeContext)
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0); // Estado para la posición inicial de la paginación
  const [rows, setRows] = useState(5); // Estado para el número de registros por página
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const valorBuscado = new URLSearchParams(location.search).get('param'); //El .search es una prop del hook location.
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
  }, [valorBuscado]); // Se va a ejecutar cada vez que se modifique valor buscado!!

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

          <div style={ Modo ? {}: {backgroundColor:"rgb(37, 41, 37)"}} className='col-9'>      
            <CardProductos info={paginatedResults}/>
          </div>

        </div>
      </div>
            <Paginator first={first} rows={rows} totalRecords={results.length} onPageChange={onPageChange} />
             {/*TODO: Verificar que ultima pagina cuando no tiene todos los elementos funcione. Ej: "Estudiantes de Rio Cuarto"  */}
    </MainLayout>
  );
}
