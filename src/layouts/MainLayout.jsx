import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext} from 'react';
import { ModeContext } from "../contexts/MainContext";
import "./MainLayout.css"

export default function MainLayout({ children }) {   
    const {Tema} = useContext(ModeContext) 
    return (
        <div className= "flex flex-column min-h-screen bg-black-alpha-10" >
            <Navbar/>
            <main className={`flex-grow-1 p-4 ${Tema}`}>
                {children}
            </main>
            <Footer />
        </div>
    )
}