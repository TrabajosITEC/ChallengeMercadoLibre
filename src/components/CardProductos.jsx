import numeral from 'numeral';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { ModeContext } from '../contexts/MainContext';
import './CardProductos.css'

export default function CardProductos({ info }) {
  const { Dolar, moneda } = useContext(ModeContext)
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(info); 
  }, [info]); 
  const navigate = useNavigate()
  const handleDetalleProducto = (idRecibida) => {
      navigate(`/detalle?id=${idRecibida}`);
  };

  const itemTemplate = (product, index) => {
  
    return (
      <div className="col-11" key={product.id}>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <img className="max-w-10rem w-full max-h-10rem h-full  shadow-2" src={product.thumbnail} alt={product.title} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="col-9 flex flex-column align-items-center sm:align-items-start gap-3">
                <h3 className='marcaProducto'>
                  {product.attributes.find(atr => atr.id === "BRAND" )? product.attributes.find(atr => atr.id === "BRAND" ).value_name : "" }
                </h3>
              <Button className='custom-link-button'  label={product.title} onClick={() => handleDetalleProducto(product.id)}/>
           
              <div className="flex align-items-center gap-3">
   
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-users"></i>
                  <span className="font-semibold">{product.seller.nickname}</span>
                </span>
              </div>
            </div>
            <div className="col-3 flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="mt-5 text-xl font-semibold">  
                {
                  moneda.code === product.currency_id ? 
                  `${product.currency_id} ${numeral(product.price).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')}` 
                :
                  product.currency_id === "USD" ?
                    `${moneda.code} ${numeral(product.price* Dolar).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')  }`
                      : 
                      product.currency_id === "ARS" ?
                        `${moneda.code} ${numeral(product.price/ Dolar).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')  }`
                        : ""                  
                      } 
                </span>
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
