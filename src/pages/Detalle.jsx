import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useCounter } from 'primereact/hooks';
import numeral from 'numeral';
import Galeria from '../components/Galeria';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useContext} from 'react';
import { ModeContext } from "../contexts/MainContext";

export default function Detalle() {
  const { setcarritoCont,Dolar,moneda,setTotalCarritoCont } = useContext(ModeContext)
  

  const [results, setResults] = useState({});

  const { count, increment, decrement} = useCounter(1);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  
  const toast = useRef(null);
  const showSuccess = (titulo) => {
    toast.current.show({severity:'success', summary: '¡Agregado con exito!', detail:`${titulo}`, life: 3000});
  }
  
  const navigate = useNavigate()
  const handlePagoyEnvio = (results) => {
    navigate("/PagoyEnvio", { state: {results, count} })
  }


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`)
        const data = await response.json()
        console.log(data)
        setResults(data)
      } catch (error) {
        console.error('Error en busqueda de elementos:', error)
      } 
    };
    if (id) {
      fetchResults()
    }
  }, [id]); // Se va a ejecutar cada vez que se modifique valor buscado!!

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];
    const productoExistente = carrito.find(item => item.id === results.id);
    let carritoActualizado
    if (productoExistente) {
      carritoActualizado = carrito.map(item => 
          item.id === results.id ? { ...item, quantity: item.quantity + count } : item
      );
  } else {
      carritoActualizado = [...carrito, { ...results, quantity: count }];
  }
    localStorage.setItem('listaCarrito', JSON.stringify(carritoActualizado));
    const totalCarrito = carritoActualizado.reduce((total, item) => total + item.price * item.quantity, 0);
    localStorage.setItem('totalCarrito', JSON.stringify(totalCarrito));
    setcarritoCont(carritoActualizado.length)
    setTotalCarritoCont(false)
    showSuccess(results.title);
  };

  return (
    <MainLayout>
        <div style={{background:"white"}} className ="row grid flex justify-content-center flex-wrap">
          <div className='col-5'>     
            <Galeria info={results.pictures? results.pictures : []}></Galeria>
          </div>
          <div className='col-4'>
            <h1 style={{margin:"0px"}}>{results.title}</h1>
            <span className="text-5xl font-light">  
                {
                  moneda.code === results.currency_id ? 
                  `${results.currency_id} ${numeral(results.price).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')}` 
                :
                  results.currency_id === "USD" ?
                    `${moneda.code} ${numeral(results.price* Dolar).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')  }`
                      : 
                      results.currency_id === "ARS" ?
                        `${moneda.code} ${numeral(results.price/ Dolar).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')  }`
                        : ""                  
                      } 
                </span>
          <div className='flex flex-row flex-wrap'>

              <div className="flex align-items-center justify-content-center mr-5 mt-6">
                <div className='flex flex-column'>
                  <Button style={{marginBottom:"10px"}}
                    label="Comprar"
                    raised size="normal"
                    onClick={()=>{handlePagoyEnvio(results)}}
                    />
                  <Toast ref={toast} />
                  <Button label="Agregar al carrito" outlined raised size="Normal" onClick={()=>agregarAlCarrito()} />
                </div>
              </div>

              <div className="flex align-items-center justify-content-center mt-6">
                <div className="flex flex-wrap gap-3">
                    <Button icon="pi pi-minus" className="p-button-outlined p-button-rounded" onClick={count>1?decrement: () => {} }></Button>
                    <span className="font-light text-2xl mb-5">{count}</span>
                    <Button icon="pi pi-plus" className="p-button-outlined p-button-rounded p-button-success" onClick={increment}></Button>
                </div>
              </div>
              
          </div>

          </div>
        </div>
    </MainLayout>
  );
};



