import { Steps } from 'primereact/steps';

export default function ControlledDemo() {
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
            <div className="flex flex-wrap justify-content-end gap-2 mb-1">
                <p></p>
            </div>
            <Steps model={items} activeIndex="" />
        </div>
    )
}
    