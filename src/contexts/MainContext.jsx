import { createContext, useState } from "react";

export const ModeContext = createContext()

export const ModeProvider = ({children})=>{
    const [Tema, setTema] = useState("fondo");
    const [Modo, setModo] = useState(true)
    const handleTema = (e) => {
        setModo(!Modo)
        if (Modo === false) {
          setTema("fondo");
        } else {
          setTema("fondo2");
        }
      };

    const data = { Tema, handleTema };
    return(
        <ModeContext.Provider value={data}>
            {children}
        </ModeContext.Provider>
    )
}