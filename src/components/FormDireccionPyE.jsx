import React, { useState, useRef } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { ProgressBar } from 'primereact/progressbar';
import { Checkbox } from "primereact/checkbox";
import { Toast } from 'primereact/toast';
import {  useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'primereact/confirmdialog';

export default function FormDireccionPyE({ results, count }) {
    const navigate = useNavigate()

    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const [Calle, setCalle] = useState('')
    const [Altura, setAltura] = useState('')
    const [Ciudad, setCiudad] = useState('')
    const [CodigoPostal, setCodigoPostal] = useState('')
    const [Direccion, setDireccion] = useState({Calle:"",Altura:"",Ciudad:"",CodigoPostal:""})
    
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
            setAdvertenciaDir(false)
            setConfirmacionDir(true)
            setBarraAvance(BarraAvance + 33)
            setDireccion({Calle, Altura, Ciudad, CodigoPostal}) 
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

    // const accept = (results, count) => {
    //     toast.current.show({ severity: 'info', summary: 'Compra Exitosa', detail: '¡Felicitaciones!. Redirigiendo...', life: 3000 });
    //     setBarraAvance(100)
    //     const listaCompras = JSON.parse(localStorage.getItem('listaCompras')) || [];
    //     results.forEach(results => {
    //         let formaPago = Pagos.join(" - ")
    //         const ProdNuevo = {Nombre:results.title,Imagen:results.thumbnail, Cantidad:count, TotalPagado: results.price*count, FormaPago: formaPago, DireccionEnvio: `${Direccion.Calle} ${Direccion.Altura}, ${Direccion.Ciudad} - ${Direccion.CodigoPostal}`  }  
    //         listaCompras.push(ProdNuevo)
    //     });
    //     // let listaActualizada = [...listaCompras, { ...ProdNuevo }];
    //     localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
        
    //     setTimeout(() => {
    //         navigate("/misCompras", { state: { results, count, Direccion, Pagos } });
    //     }, 4000); 
        
    // }

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Compra Exitosa', detail: '¡Felicitaciones!. Redirigiendo...', life: 3000 });
        setBarraAvance(100);
        const listaCompras = JSON.parse(localStorage.getItem('listaCompras')) || [];
        results.forEach(result => {
            let formaPago = Pagos.join(" - ");
            const ProdNuevo = {
                Nombre: result.title,
                Imagen: result.thumbnail,
                Cantidad: result.quantity,
                TotalPagado: result.price * result.quantity ,
                FormaPago: formaPago,
                DireccionEnvio: `${Direccion.Calle} ${Direccion.Altura}, ${Direccion.Ciudad} - ${Direccion.CodigoPostal}`
            };
            listaCompras.push(ProdNuevo);
        });
        localStorage.setItem('listaCompras', JSON.stringify(listaCompras));

        setTimeout(() => {
            navigate("/misCompras", { state: { results, count, Direccion, Pagos } });
        }, 4000);
    };



    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Su compra no fue procesada.', life: 3000 });
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
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={45} inputId="ac" value={Calle}  onChange={(e) => setCalle(e.value)} />
                        <label htmlFor="ac">Calle</label>
                    </span>
                    <span className="p-float-label mb-5 ml-5">
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={45} inputId="ad" value={Altura}  onChange={(e) => setAltura(e.value)} />
                        <label htmlFor="ad">Altura</label>
                    </span>
                    <span className="p-float-label mb-5 ml-5">
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={45} inputId="ae" value={Ciudad}  onChange={(e) => setCiudad(e.value)} />
                        <label htmlFor="ae">Ciudad</label>
                    </span>
                    <span className="p-float-label mb-5 ml-5">
                        <AutoComplete disabled={ConfirmacionDir? true:false} size={45} inputId="af" value={CodigoPostal}  onChange={(e) => setCodigoPostal(e.value)} />
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
                        <div className="flex flex-row flex-wrap" style={{marginTop: "87px"}}>
                            { ConfirmacionPago ? 
                                <Button className="ml-5 mb-2 bg-yellow-500 border-transparent text-black-alpha-90" style={{width:"200px"}} onClick={handleEditarPago} >Editar</Button>
                                :
                                <Button className="ml-5 mb-2" style={{width:"200px"}} onClick={handlePago} >Confirmar forma pago</Button>
                            }                        
                        </div>  
                        {AdvertenciaPago && <Message severity="warn" text="Deben seleccionar al menos un metodo de pago" />}
                        {ConfirmacionPago && <Message severity="success" text="Forma de pago confirmada" />}
                </div>
            </div>

            <div className="flex flex-row flex-wrap shadow-3  justify-content-center">
                <Toast ref={toast} />
                {/* <Button 
                severity="success" 
                className="mb-2 mt-2 flex align-items-center justify-content-center"
                disabled={ConfirmacionPago && ConfirmacionDir  ? false:true}
                onClick={handleConfirmar}
                >
                Confirmar Compra
                </Button> */}
                <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Esta por confirmar su compra. Esta seguro/a?" 
                header="Confirmacion" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                <div className="card flex justify-content-center">
                    <Button 
                        severity="success" 
                        onClick={() => setVisible(true)} 
                        disabled={ConfirmacionPago && ConfirmacionDir  ? false:true}
                        icon="pi pi-check" 
                        label="Confirmar Compra" />
                </div>
            </div>

        </div>

    )
}
