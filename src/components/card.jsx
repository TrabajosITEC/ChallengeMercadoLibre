
import React from 'react'; 
import { Card } from 'primereact/card';



export default function BasicDemo({titulo, precio}) {
    return (
        <div className="card">
            <Card title= {titulo} >
                <p className="m-0">
                    {precio}
                </p>
            </Card>
        </div>
    )
}
        