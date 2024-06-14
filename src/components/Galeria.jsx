import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import './Galeria.css'

export default function Galeria({info}) {
    const [images, setImages] = useState(null);

        useEffect(() => {
        if (info && info.length > 0) {
            const data = info.map(item => ({
                thumbnailImageSrc: item.url,
                itemImageSrc: item.secure_url,
                alt: "50px",
                title: ""
            }));
            setImages(data);
        } else {
            setImages([]); 
        }
    }, [info]);

    const itemTemplate = (item) => {
        return (
            <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img src={item.itemImageSrc} alt={item.alt} style={{ height: '100%', width: 'auto' }} />
            </div>
        );
    };

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    return (
        <div className="card"> 
            <Galleria value={images} numVisible={5} circular style={{ maxWidth: '640px' }} 
                showItemNavigators showItemNavigatorsOnHover showIndicators
                showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate}  />
        </div>
    )
}
       