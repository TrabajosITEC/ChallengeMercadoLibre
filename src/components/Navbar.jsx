import React, { useState,useRef } from 'react';
import './Navbar.css';
import { ReactComponent as Logo } from '../img/logo.svg';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import { ModeContext } from "../contexts/MainContext";
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';

export default function Navbar() {
    const { carritoCont, Dolar } = useContext(ModeContext)
    const [moneda, setMoneda] = useState({ name: 'Peso', code: 'ARS' })
    const op = useRef(null);
    const [Buscador, setBuscador] = useState("")
    const navigate = useNavigate()

    const handleBuscador = async () => {
        if (Buscador.trim() !== '') {
          navigate(`/results?param=${Buscador}`); // Aca pasas el parametro que va a levantar via Searcparams
        }
      };

    const handleCarrito = () => {
        navigate("/carrito")
    }

    const handleInicio = () => {
        navigate("/")
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
