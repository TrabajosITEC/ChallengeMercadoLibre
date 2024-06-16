import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { ReactComponent as Logo } from '../img/logo.svg';
import { Avatar } from 'primereact/avatar';
// import { useContext } from 'react';
// import { ModeContext } from '../contexts/MainContext';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import { ModeContext } from "../contexts/MainContext";


export default function Navbar() {
    const { carritoCont } = useContext(ModeContext)

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

    const items = [
        {
            label: 'Ubicación',
            icon: 'pi pi-map-marker',
        },
        {
            label: 'Ofertas',
            icon: 'pi pi-tags'
        },
        {
            label: 'Supermercado',
            icon: 'pi pi-shop'
        },
        {
            label: 'Moda',
            icon: 'pi pi-shopping-bag'
        },
        {
            label: 'Categorías',
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',                   
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',                 
                },
            ]
        },
        {
            label: 'Ayuda',
            icon: 'pi pi-envelope',
        },
        {
            label: `Carrito ${carritoCont}`,
            icon: 'pi pi-shopping-cart',
            command:  ()=> handleCarrito()
        },
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );
    
    return (
        <div>
            <div className='grid bg-yellow-500'>
                <div className="col-2">
                    <div className="flex align-items-center justify-content-center  mt-3">
                        <a href="/" className='text-white text-center font-bold no-underline'>
                        <Logo className="App-logo"></Logo>
                        TiendaReact
                        </a>
                    </div>
                </div>
                <div className="col-5">
                    <div className="text-center p-1 mt-3">
                        {/* <InputText style={{ width: '400px' }} placeholder=" Search" type="text"/> */}
                        <InputText
                            style={{ width: '400px' }} 
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
                </div>
                <div className="col">
                    <div className="text-center p-3 border-round-sm bg-primary-reverse font-bold ">3</div>
                </div>
            </div>
            <div className="card">
                <Menubar id='navbar' model={items} end={end} />
            </div>
        </div>
    )
}
        