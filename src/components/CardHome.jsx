import React from 'react'; 
import { Card } from 'primereact/card';
import { useEffect,useState } from "react";
import numeral from 'numeral';
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function CardHome({ id }) {
    const [results, setResults] = useState({});
    const navigate = useNavigate()
    const handleDetalleProducto = (idRecibida) => {
        navigate(`/detalle?id=${idRecibida}`);
    };

    useEffect(() => {
        const fetchResults = async () => {
        try {
            const response = await fetch(`https://api.mercadolibre.com/items/${id}`)
            const data = await response.json()
            console.log(data)
            setResults(data)
        } catch (error) {
            console.error('Error en busqueda de elementos:', error)
        } 
        };
        if (id) {
        fetchResults()
        }
    }, [id]);

    const footer = (
        <div className="card-footer">
            <span className="text-xl font-semibold">$ {numeral(results.price).format("0,0.00")}</span>
            <Rating value={Math.floor(Math.random() * 3) + 3} readOnly cancel={false} />
        </div>
    )

        return (
            <div className="card-container flex justify-content-center">
            <Card className="lg:w-25rem h-25rem card-content" footer={footer}>
                <div className="card-content-inner">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={results.thumbnail} alt={results.title} />
                    <h5 className="text-center">{results.attributes?.find(atr => atr.id === "BRAND")?.value_name || ""}</h5>
                    <Button className='custom-link-button text-sm font-bold'  label={results.title} onClick={() => handleDetalleProducto(results.id)}/>
                </div>
            </Card>
        </div>
    )
}
        