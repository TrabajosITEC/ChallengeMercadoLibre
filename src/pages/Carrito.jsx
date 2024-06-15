import { Card } from "primereact/card";
import { Button } from "primereact/button";
import MainLayout from "../layouts/MainLayout";
import { useState, useEffect } from "react";
import numeral from 'numeral';

export default function Carrito(){
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
    };

    return(
        <MainLayout>
            <div className="flex row">
                <ul className="col-8">
                    {
                    carrito.map(product => (
            
                    <li key={product.id}>
                        <Card title={product.title} subTitle={'Precio unitario: $'+ product.price}>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    icon="pi pi-minus"
                                    className="p-button-outlined p-button-rounded"
                                    onClick={() => actualizarCantidad(product.id, product.quantity > 1 ? product.quantity - 1 : 1)}
                                ></Button>
                                    <span className="font-light text-2xl mb-5">{product.quantity}</span>
                                <Button
                                    icon="pi pi-plus"
                                    className="p-button-outlined p-button-rounded p-button-success"
                                    onClick={() => actualizarCantidad(product.id, product.quantity + 1)}
                                ></Button>
                                <p>Subtotal: {numeral(product.quantity * product.price).format('$0,0.00')}</p>
                            </div>
                            <Button icon='pi pi-trash' label="Eliminar" severity="danger" className="bg-red-500" onClick={() => eliminarDelCarrito(product.id)}></Button>
                        </Card>
                    </li>
                    ))}
                </ul>
                <div className="col-4">
                    <Card title={'Resumen de Compra'}>
                        <p>Total: {numeral(totalCarrito).format('$0,0.00')}</p>
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}