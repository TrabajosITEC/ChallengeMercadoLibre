import { Card } from "primereact/card";
import { Button } from "primereact/button";
import MainLayout from "../layouts/MainLayout";
import { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import numeral from 'numeral';
import { useContext} from 'react';
import { ModeContext } from "../contexts/MainContext";

export default function Carrito(){
    const { setcarritoCont,moneda,Dolar, totalCarritoCont  } = useContext(ModeContext)
    const [carrito,setCarrito] = useState([]);
    const [totalCarrito, setTotalCarrito] = useState(0);
    

    useEffect(()=>{
        const listaCarrito = localStorage.getItem('listaCarrito');
        if (listaCarrito){
            setCarrito(JSON.parse(listaCarrito));
            
        }
        const precioTotal = JSON.parse(localStorage.getItem('totalCarrito'));
        if (precioTotal) {
            setTotalCarrito(precioTotal);
        }
    },[]);
    
    const eliminarDelCarrito = (id) => {
        const carritoActualizado = carrito.filter(item => item.id !== id);
        setCarrito(carritoActualizado);
        localStorage.setItem('listaCarrito',JSON.stringify(carritoActualizado));
        const nuevoTotal = carritoActualizado.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalCarrito(nuevoTotal);
        localStorage.setItem('totalCarrito', JSON.stringify(nuevoTotal));
        setcarritoCont(carritoActualizado.length)
    }

    const actualizarCantidad = (id, cantidad) => {
        const carritoActualizado = carrito.map(item => {
            if (item.id === id) {
                return { ...item, quantity: cantidad };
            }
            return item;
        });
        setCarrito(carritoActualizado);
        localStorage.setItem('listaCarrito', JSON.stringify(carritoActualizado));
        const nuevoTotal = carritoActualizado.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalCarrito(nuevoTotal);
        localStorage.setItem('totalCarrito', JSON.stringify(nuevoTotal));
        setcarritoCont(carritoActualizado.length)
    };

    const navigate = useNavigate()
    const handlePagoyEnvio = () => {
      navigate("/PagoyEnvioCarrito" , { state: { carrito, totalCarrito } })
    }

    return(
        <MainLayout>
            <div className="flex row">
                <ul className="col-8 mt-0">
                    {
                    carrito.map(product => (
            
                    <li key={product.id} className="list-none mb-2">
                        <Card title={product.title} subTitle={
                            moneda.code === 'ARS' ?('Precio unitario: $' + numeral(product.price).format('0,0.00')):('Precio unitario: USD' + numeral(product.price/Dolar).format('0,0.00'))} className="">
                            <div className="grid align-items-center">
                                <div className="col-3 flex align-items-center gap-3">
                                    <Button
                                        icon="pi pi-minus"
                                        className="p-button-outlined p-button-rounded"
                                        onClick={() => actualizarCantidad(product.id, product.quantity > 1 ? product.quantity - 1 : 1)}
                                    ></Button>
                                    <span className="font-light text-2xl w-2rem text-center">{product.quantity}</span>
                                    <Button
                                        icon="pi pi-plus"
                                        className="p-button-outlined p-button-rounded p-button-success"
                                        onClick={() => actualizarCantidad(product.id, product.quantity + 1)}
                                    ></Button>
                                </div>
                                <div className="col-6">
                                    {moneda.code === 'ARS' ? (
                                        <p className="text-l text-center w-8rem">Subtotal pesos: {numeral(product.quantity * product.price).format('$0,0.00')}</p>
                                    ):(
                                        <p className="text-l text-center w-8rem">Subtotal dólares: {numeral(product.quantity * product.price /Dolar).format('$0,0.00')}</p>
                                    )}
                                </div>
                                <div className="col-2 flex justify-content-end">
                                    <Button 
                                        label="Eliminar"
                                        icon="pi pi-trash" 
                                        severity="danger" 
                                        className="bg-red-500" 
                                        onClick={() => eliminarDelCarrito(product.id)}
                                    ></Button>
                                </div>
                            </div>
                        </Card>
                    </li>
                    ))}
                </ul>
                <div className="col-4">
                    <Card title={'Resumen de Compra'} subTitle={'TC: '+Dolar}>
                        <div className="grid ">
                            <div className="col-7">
                            <p>Total USD: {numeral(totalCarritoCont? 0:totalCarrito/Dolar).format('$0,0.00')}</p>
                            <p className="font-bold">Total Pesos: {numeral(totalCarritoCont? 0: totalCarrito).format('$0,0.00')}</p>
                            </div>
                            <div className="col-5 pt-2">
                            <Button style={{marginBottom:"10px"}}
                                label="Comprar"
                                raised size="normal"
                                onClick={()=>{handlePagoyEnvio()}}
                                disabled={totalCarritoCont || totalCarrito===0 ?true:false}
                            />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}