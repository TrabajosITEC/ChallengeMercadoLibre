import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { ProgressBar } from 'primereact/progressbar';
import { Checkbox } from "primereact/checkbox";

export default function FormDireccion() {
    const [Calle, setCalle] = useState('')
    const [Altura, setAltura] = useState('')
    const [Ciudad, setCiudad] = useState('')
    const [CodigoPostal, setCodigoPostal] = useState('')
    
    const [AdvertenciaDir, setAdvertenciaDir] = useState(false)
    const [ConfirmacionDir, setConfirmacionDir] = useState(false)

    const [AdvertenciaPago, setAdvertenciaPago] = useState(false)
    const [ConfirmacionPago, setConfirmacionPago] = useState(false)

    const [BarraAvance, setBarraAvance ] = useState(0)

    const [Pagos, setPagos] = useState([]);

    const onPagosChange = (e) => {
        let _Pagos = [...Pagos];

        if (e.checked)
            _Pagos.push(e.value);
        else
            _Pagos.splice(_Pagos.indexOf(e.value), 1);

        setPagos(_Pagos);
    }

    const handleDireccion = () => {
        if (Calle === "" || Altura === "" || Ciudad === "" || CodigoPostal === "") {
            setAdvertenciaDir(true)
        } else {
            let direccion = {Calle, Altura, Ciudad, CodigoPostal}
            setAdvertenciaDir(false)
            setConfirmacionDir(true)
            setBarraAvance(BarraAvance + 33)
            return direccion
        }
    }

    const handleEditarDir = () => {
        setConfirmacionDir(false)
        setBarraAvance(BarraAvance - 33)
    }

    const handlePago = () => {
        if (Pagos.length === 0) {
            setAdvertenciaPago(true)
        } else {
            setAdvertenciaPago(false)
            setConfirmacionPago(true)
            setBarraAvance(BarraAvance + 33)
            console.log(Pagos)
        }
    }

    const handleEditarPago = () => {
        setConfirmacionPago(false)
        setBarraAvance(BarraAvance - 33)
    }



    return (
        <div className="flex flex-column">
            <div>
                <label htmlFor="barra">Progreso</label>
                <ProgressBar id="barra" value={BarraAvance}></ProgressBar>
            </div>
            <div className="flex flex-row flex-wrap">
                <div className="card flex flex-column justify-content-center mt-1 col-6 shadow-1">
                    <h3> Datos de envio:</h3>
                </div>
                <div className="card flex flex-column justify-content-center mt-1 col-6 shadow-1">
                    <h3> Forma de pago:</h3>
                </div>

            </div>

            <div className="flex flex-row flex-wrap">
                <div className="card flex flex-column justify-content-center mt-1 col-6 shadow-3">
                    <span className="p-float-label mb-5 ml-5 mt-3 ">
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={75} inputId="ac" value={Calle}  onChange={(e) => setCalle(e.value)} />
                        <label htmlFor="ac">Calle</label>
                    </span>
                    <span className="p-float-label mb-5 ml-5">
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={75} inputId="ad" value={Altura}  onChange={(e) => setAltura(e.value)} />
                        <label htmlFor="ad">Altura</label>
                    </span>
                    <span className="p-float-label mb-5 ml-5">
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={75} inputId="ae" value={Ciudad}  onChange={(e) => setCiudad(e.value)} />
                        <label htmlFor="ae">Ciudad</label>
                    </span>
                    <span className="p-float-label mb-5 ml-5">
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={75} inputId="af" value={CodigoPostal}  onChange={(e) => setCodigoPostal(e.value)} />
                        <label htmlFor="af">Codigo Postal</label>
                    </span>
                    <div className="flex flex-row flex-wrap">
                        { ConfirmacionDir ? 
                            <Button className="ml-5 mb-2 bg-yellow-500 border-transparent text-black-alpha-90" style={{width:"200px"}} onClick={handleEditarDir} >Editar</Button>
                            :
                            <Button className="ml-5 mb-2" style={{width:"200px"}} onClick={handleDireccion} >Confirmar direccion</Button>
                        }
                    </div>  
                    {AdvertenciaDir && <Message severity="warn" text="Deben estar todos los campos completos" />}
                    {ConfirmacionDir && <Message severity="success" text="Direccion confirmada" />}
                </div>

                <div className="card flex flex-column justify-content-start mt-1 col-6 shadow-3">
                        <div className="flex align-items-center mb-5 ml-5">
                            <Checkbox disabled={ConfirmacionPago? true:false} inputId="forma1" name="formaPago" value="Codigo QR" onChange={onPagosChange} checked={Pagos.includes('Codigo QR')} />
                            <label htmlFor="forma1" className="ml-2">Codigo QR</label>
                        </div>
                        <div className="flex align-items-center mb-5 ml-5">
                            <Checkbox disabled={ConfirmacionPago? true:false} inputId="forma2" name="formaPago" value="Tarjeta de Debito" onChange={onPagosChange} checked={Pagos.includes('Tarjeta de Debito')} />
                            <label htmlFor="forma2" className="ml-2">Tarjeta de Debito</label>
                        </div>
                        <div className="flex align-items-center mb-5 ml-5">
                            <Checkbox disabled={ConfirmacionPago? true:false} inputId="forma3" name="formaPago" value="Tarjeta de Credito" onChange={onPagosChange} checked={Pagos.includes('Tarjeta de Credito')} />
                            <label htmlFor="forma3" className="ml-2">Tarjeta de Credito</label>
                        </div>
                        <div className="flex align-items-center mb-5 ml-5">
                            <Checkbox disabled={ConfirmacionPago? true:false} inputId="forma4" name="formaPago" value="Cheque electronico" onChange={onPagosChange} checked={Pagos.includes('Cheque electronico')} />
                            <label htmlFor="forma4" className="ml-2">Cheque electronico</label>
                        </div>
                        <div className="flex flex-row flex-wrap">
                        { ConfirmacionPago ? 
                            <Button className="ml-5 mb-2 bg-yellow-500 border-transparent text-black-alpha-90" style={{width:"200px"}} onClick={handleEditarPago} >Editar</Button>
                            :
                            <Button className="ml-5 mb-2" style={{width:"200px"}} onClick={handlePago} >Confirmar direccion</Button>
                        }                        
                    </div>  
                        {AdvertenciaPago && <Message severity="warn" text="Deben seleccionar al menos un metodo de pago" />}
                        {ConfirmacionPago && <Message severity="success" text="Forma de pago confirmada" />}
                </div>

            </div>
        </div>

    )
}
        