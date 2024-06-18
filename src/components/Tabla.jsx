
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


export default function Tabla({results, count, Direccion, Pagos}) {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const compras = JSON.parse(localStorage.getItem('listaCompras')) || [];
        setProducts(compras)
    },[]);

    console.log("Hola")
    console.log(products)

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // };

    // const imageBodyTemplate = (product) => {
    //     return <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
    // };

    // const priceBodyTemplate = (product) => {
    //     return formatCurrency(product.price);
    // };


    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Mis Compras</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );
    const footer = `In total there are ${products ? products.length : 0} products.`;

    return (
        <div className="card">
            <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="Nombre" header="Producto"></Column>
                {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                <Column field="Cantidad" header="Cantidad"></Column>
                <p>{products}</p>
                <Column field="TotalPagado" header="Total Pagado" ></Column>
                <Column field="FormaPago" header="Forma Pago"></Column>
                <Column field="DireccionEnvio" header="Direccion de Envio"></Column>
            </DataTable>
        </div>
    );
}
        