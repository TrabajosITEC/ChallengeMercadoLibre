import { useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { ModeContext } from "../contexts/MainContext";
import { useLocation } from "react-router-dom";
import ControlledDemo from "../components/Pasos";
import FormDireccion from "../components/FormDireccion";
import numeral from 'numeral';

export default function PagoyEnvio() {
    const location = useLocation()
    const { Dolar } = useContext(ModeContext)
    const { results, count } = location.state || {}

  return (
    <MainLayout>
        <div style={{background:"white"}} className="flex flex-row flex-wrap">
                  <div className=" compra-resumen flex flex-column col-2 shadow-3">
                    <h3>Tu Compra</h3>
                      <p>{`${results.title}`}</p>
                      <p>{`Cantidad comprada: ${count}`}</p>
                      <p>{`Precio en dólares: $ ${numeral(results.price/Dolar).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')}`}</p>
                      <p>{`Tipo de Cambio: ${Dolar}`}</p>
                      <p>{`Precio en pesos: $ ${numeral(results.price).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')}`}</p>
                      <p>{`Total a pagar: ${numeral(count * results.price).format("0,0.00").replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.')}`}</p>
                  </div>
                  <div className="flex flex-column col-10">
                    <ControlledDemo> </ControlledDemo>
                    <FormDireccion results={results} count={count} ></FormDireccion>
                  </div>
        </div>
    </MainLayout>
  );
}
