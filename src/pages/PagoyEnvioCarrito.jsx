// import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
// import { ProgressBar } from 'primereact/progressbar';
import { useLocation } from "react-router-dom";
import ControlledDemo from "../components/Pasos";
import FormDireccionPyE from "../components/FormDireccionPyE";
import numeral from 'numeral';

export default function PagoyEnvioCarrito() {
    // const [avance, setAvance] = useState(0)
    const location = useLocation()
    const { carrito ,totalCarrito } = location.state || {}
    const results = carrito
    const count = carrito.length
    


  return (
    <MainLayout>
        <div style={{background:"white"}} className="flex flex-row flex-wrap">
                  <div className=" compra-resumen flex flex-column col-2 shadow-3">
                    <h3>Tu Compra</h3>
                      <p>{`Productos Comprados: ${carrito.length}`}</p>
                      <p>{`Total a pagar: ${numeral(totalCarrito).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')}`}</p>
                  </div>
                  <div className="flex flex-column col-10">
                    <ControlledDemo> </ControlledDemo>
                    <FormDireccionPyE results={results} count={count} ></FormDireccionPyE>
                  </div>
        </div>
    </MainLayout>
  );
}
