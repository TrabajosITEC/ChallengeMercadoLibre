import React from 'react';
import { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { ReactComponent as Logo } from '../logo.svg';
import { Avatar } from 'primereact/avatar';
import { ModeContext } from '../contexts/MainContext';
import './Navbar.css'

export default function Navbar() {
    const { Tema } = useContext(ModeContext);
    const items = [
        {
            label: 'Ubicación',
            icon: 'pi pi-map-marker'
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
            label: 'Carrito',
            icon: 'pi pi-shopping-cart'
        },
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );
    
    return (
        <div>
            <div class='grid bg-orange-500'>
                <div class="col-2 ">
                    <div class="flex flex-row flex-wrap align-items-center justify-content-center text-center p-1 mt-3 text-white font-bold">
                        <Logo className="App-logo"></Logo>
                        <div>
                            TiendaReact
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="text-center p-1 mt-3">
                        <InputText style={{ width: '400px' }} placeholder=" Search" type="text"/>
                    </div>
                </div>
                <div class="col">
                    <div class="text-center p-3 border-round-sm bg-primary-reverse font-bold ">3</div>
                </div>
            </div>
            <div className="card">
                <Menubar id='navbar' model={items} end={end} />
            </div>
        </div>
    )
}
        