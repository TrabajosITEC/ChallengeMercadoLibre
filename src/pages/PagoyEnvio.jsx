// import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
// import { ProgressBar } from 'primereact/progressbar';
import { useLocation } from "react-router-dom";
import ControlledDemo from "../components/Pasos";

export default function PagoyEnvio() {
    // const [avance, setAvance] = useState(0)
    const location = useLocation()
    const { results, count } = location.state || {}

  return (
    <MainLayout>
        <div style={{background:"white"}} className="card">
            <ControlledDemo></ControlledDemo>
            <h1>Progreso</h1>
            <p>{results.title}</p>
            <p>{count}</p>
            {/* <ProgressBar value={avance}></ProgressBar> */}
        </div>
    </MainLayout>
  );
}
