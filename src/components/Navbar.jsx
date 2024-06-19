import React, { useState,useRef,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ModeContext } from "../contexts/MainContext";
import { ReactComponent as Logo } from '../img/logo.svg';
import './Navbar.css';

export default function Navbar() {
    const { carritoCont, moneda, setMoneda } = useContext(ModeContext)
    
    const op = useRef(null);
    const [Buscador, setBuscador] = useState("")
    const navigate = useNavigate()

    const handleBuscador = async () => {
        if (Buscador.trim() !== '') {
          navigate(`/results?param=${Buscador}`);         }
      };

    const handleCarrito = () => {
        navigate("/carrito")
    }

    const handleInicio = () => {
        navigate("/")
    }
    
    const handleMisCompras = () => {
        navigate("/misCompras")
    }

    const monedas = [
        {name:'Peso', code:'ARS'},
        {name:'Dolar', code:'USD'}
    ]

    const items = [
    ];

    const start = (
        <div className='justify-content-center'>
                        <Button
                            style={{background:"none", border:"none", boxShadow: "none"}}               
                            className='text-white font-bold'
                            onClick={() => handleInicio()}
                            >
                            <Logo className="App-logo"></Logo>
                            TiendaReact
                        </Button>
                        <InputText
                            style={{ width: '400px', margin: '10px' }} 
                            className='pt-2'
                            placeholder="Buscar productos, marcas y más..." 
                            type="text" 
                            value={Buscador}
                            onChange={(e) => setBuscador(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleBuscador();
                            }
                            }}
                        />
        </div>
    );

    const end = (
        <div className="flex align-items-center gap-2 ml-auto">
            <Button label={moneda.code} className="bg-transparent border-yellow-400 text-yellow-400 font-bold" onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                <Dropdown value={moneda} className='border-transparent' onChange={(e) => setMoneda(e.value)} options={monedas} optionLabel="name"></Dropdown>
            </OverlayPanel>
            <Button onClick={handleCarrito} label={`${carritoCont}`} icon="pi pi-shopping-cart" className="bg-transparent border-yellow-400 text-yellow-400 font-bold" />
            <Button onClick={handleMisCompras} label="Mis Compras" className="bg-transparent border-white text-white" />
            <Button label="Iniciar Sesión" className="bg-transparent border-white text-white" />
            <Button label="Registrarse" className="bg-transparent text-white border-white" />
        </div>
    );

    return (
        <div className="card">
            <Menubar className='bg-blue-700 border-none	border-noround justify-content-center flex relative' model={items} start={start} end={end} />
        </div>
    );
}
