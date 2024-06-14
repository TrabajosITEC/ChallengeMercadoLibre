import Navbar from "../components/Navbar";
// import { useContext } from "react";
// import { ModeContext } from "../contexts/MainContext";
// import { Button } from 'primereact/button';
import Footer from "../components/Footer";


export default function MainLayout({ children }) {    
    // const {Tema,handleTema} = useContext(ModeContext)
    return (
        <div>
            <Navbar/>
            {/* <Button onClick={handleTema}> Boton PrimeReact </Button>
            <button onClick={handleTema}>boton</button> */}
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    )
}