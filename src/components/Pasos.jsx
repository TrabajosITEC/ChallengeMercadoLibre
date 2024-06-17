import React, { useState } from 'react'; 
import { Steps } from 'primereact/steps';
// import { Button } from 'primereact/button';

export default function ControlledDemo() {
    // const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {
            label: 'Direccion de Envio'
        },
        {
            label: 'Medio de pago'
        },
        {
            label: 'Confirmar'
        }
    ];

    return (
        <div className="card m-0 p-0">
            {/* <div className="flex flex-wrap justify-content-end gap-2 mb-3">
                <Button outlined={activeIndex !== 0} rounded label="1" onClick={() => {setActiveIndex(0); console.log("hola")}} className="w-2rem h-2rem p-0" />
                <Button outlined={activeIndex !== 1} rounded label="2" onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0" />
                <Button outlined={activeIndex !== 2} rounded label="3" onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0" />
            </div> */}
            <div className="flex flex-wrap justify-content-end gap-2 mb-1">
                <p></p>
            </div>
            <Steps model={items} activeIndex="" />
        </div>
    )
}
    