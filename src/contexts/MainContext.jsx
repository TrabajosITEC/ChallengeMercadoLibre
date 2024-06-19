import { createContext, useState , useEffect } from "react";

export const ModeContext = createContext()

export const ModeProvider = ({children})=>{
    const carrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];

    const [totalCarritoCont, setTotalCarritoCont] = useState(false);
    const [carritoCont, setcarritoCont] = useState(carrito.length)
    
    const [moneda, setMoneda] = useState({ name: 'Peso', code: 'ARS' })
    const [Dolar,setDolar] = useState(0)

    const [Tema, setTema] = useState("light");
    const [Modo, setModo] = useState(true)
    const handleTema = (e) => {
        setModo(!Modo)
        if (Modo === false) {
          setTema("light");
        } else {
          setTema("dark");
        }
      };

    useEffect(() => {
      const fetchResults = async () => {
        try {
          const response = await fetch("https://dolarapi.com/v1/dolares/oficial")
          const data = await response.json()
          console.log(data)
          setDolar(data.venta)
        } catch (error) {
          console.error('Error:', error)
        } 
      };
      fetchResults()
    }, []);

    const data = { Modo, Tema, handleTema, carritoCont, setcarritoCont, Dolar,moneda, setMoneda, totalCarritoCont, setTotalCarritoCont };
    return(
        <ModeContext.Provider value={data}>
            {children}
        </ModeContext.Provider>
    )
}