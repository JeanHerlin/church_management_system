import React, { useState, useEffect } from 'react'
import rakitra from '../../assets/Rakitra.png'
import don from '../../assets/Don.png'
import autre from '../../assets/Autre.png'
import sortant from '../../assets/sortant.png'
import './activity.css'

function Activity({data}) {
    const [image,Setimage] = useState(autre)

    useEffect(() => {
        switch (data.Activity) {
            case "Rakitra":
                Setimage(rakitra) ;
                break;
             case "Don":
                Setimage(don);
                break;
            case "Autre":
                Setimage(autre);
                break;
            case "Sortant":
                Setimage(sortant);
                break;
        }
    }, [])

        return (
        <div className="activity">
            <div className="name__logo">
                <div className="logo">
                   <img src={image} alt="don"/>                    
                </div>
                <div className="name">
                    <span>{data.Motif}</span>
                   {data.Activity==="Sortant"? <small>{data.Activity}</small>: (data.Donneur?<small>{data.Donneur}</small>:<small>Entrant</small>)}
                </div>

            </div>
            
            <div className="price__action">
                <div className="date">
                    <small>{data.dateActivity}</small>
                </div>
                <div className="price">
                   <span>Ar {parseFloat(data.Montant).toFixed(2)}</span>
                   <i className="mdi mdi-dots-vertical"></i>
                </div>
            </div>
        </div>
    )
}

export default Activity
