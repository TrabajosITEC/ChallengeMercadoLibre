import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ModeContext } from "../contexts/MainContext";

export default function MainLayout({ children }) {    
    const {Tema,handleTema} = useContext(ModeContext)
    return (
        <div className={Tema}>
            <Navbar/>
            <button onClick={handleTema}>boton</button>
            <div>
                {children}
            </div>
            <h3>ACA VA EL COMPONENTE FOOTER</h3>
        </div>
    )
}