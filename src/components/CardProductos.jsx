import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import './CardProductos.css'
import numeral from 'numeral';
import { ModeContext } from '../contexts/MainContext';

export default function CardProductos({ info }) {
  const { Dolar } = useContext(ModeContext)
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(info); // Este cambio dipara el cambio en el DATAView.
  }, [info]); // El cambio de info dispara el useEffect

  // const [IdProducto , setIdProducto] = useState(0)
  const navigate = useNavigate()

  const handleBotonCarrito = (event) => {
    navigate("/")
  };

  const handleDetalleProducto = (idRecibida) => {

      navigate(`/detalle?id=${idRecibida}`);

  };


  const itemTemplate = (product, index) => {
  
    return (
      <div className="col-11" key={product.id}>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.thumbnail} alt={product.title} />
          {/* TODO: Tamaño maximo de imagenes  */}
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="col-9 flex flex-column align-items-center sm:align-items-start gap-3">
                <h3 className='marcaProducto'>
                  {product.attributes.find(atr => atr.id === "BRAND" )? product.attributes.find(atr => atr.id === "BRAND" ).value_name : "" }
                </h3>
              <Button className='custom-link-button '  label={product.title} onClick={() => handleDetalleProducto(product.id)}/>
           
              <div className="flex align-items-center gap-3">
   
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-users"></i>
                  <span className="font-semibold">{product.seller.nickname}</span>
                </span>
                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}>ACA EL TAG</Tag> */}
              </div>
            </div>
            <div className="col-3 flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="mt-5 text-xl font-semibold">$ {numeral(product.price).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')}</span>
              <Rating value={Math.floor(Math.random() * 3) + 3} readOnly cancel={false}></Rating>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <DataView value={products} itemTemplate={itemTemplate} />
    </div>
  );
}
