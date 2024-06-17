// import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
// import { ProgressBar } from 'primereact/progressbar';
import { useLocation } from "react-router-dom";
import ControlledDemo from "../components/Pasos";
import FormDireccion from "../components/FormDireccion";

export default function PagoyEnvio() {
    // const [avance, setAvance] = useState(0)
    const location = useLocation()
    const { results, count } = location.state || {}

  return (
    <MainLayout>
        <div style={{background:"white"}} className="card">
            <ControlledDemo></ControlledDemo>
            <FormDireccion></FormDireccion>
            <p>{results.title}</p>
            <p>{count}</p>
            
        </div>
    </MainLayout>
  );
}
