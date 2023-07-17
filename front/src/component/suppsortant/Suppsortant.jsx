import React from 'react'
import './suppsortant.css'

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
            <p>La suppression de cette sortie aura de changement sur votre solde actuel, continuer?</p>
            <span><button className="continue btn" onClick={Continue}>continuer</button>   <button className="annule btn" onClick={anull}>Annuler</button></span>
        </div>
    )
}

export default Custummessage