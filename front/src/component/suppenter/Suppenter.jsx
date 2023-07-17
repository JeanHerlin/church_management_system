import React from 'react'
import './supp.css'

function Custummessage({setCustumMess,deleteIt,suppData}) {
    
    const Continue=()=>{
        setCustumMess(ps=>!ps)
        deleteIt(suppData)
    }


    const anull=()=>{
        setCustumMess(ps=>!ps)
    }
    return (
        <div className="custummessage">
            <p>En supprimant cette entrée, votre solde va diminuer, continuer?</p>
            <span><button className="continue btn" onClick={Continue}>continuer</button>   <button className="annule btn" onClick={anull}>Annuler</button></span>
        </div>
    )
}

export default Custummessage