
import {useEffect} from 'react'
import ReactDom from 'react-dom' 
import './seuil.css'

const div = document.createElement('div')

function Newspent({spent,setAcceptation,solde}) {

    useEffect(() => {

        document.body.appendChild(div)
        return () => {
            document.body.removeChild(div)
        }
    }, [])

    return ReactDom.createPortal(
        <div className="seuilMontant">
            <div>
                <p>Votre solde ne devra pas depasser de 10000,00</p>
                <div>
                   <p>Vous allez depenser de: <strong>{spent}</strong></p>
                   <p>Alors que votre solde est de: <strong>{solde}</strong></p>
                </div>
                <button className="btn" onClick={()=>setAcceptation(false)}>OK</button>
            </div>
        </div>,div
    )
}

export default Newspent
