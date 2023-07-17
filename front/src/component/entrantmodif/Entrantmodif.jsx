import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ReactDom from 'react-dom' 
import './entrantmodif.css'
import { useContext } from 'react'
import MyContext from '../../Mycontext'

const div = document.createElement('div')

function Entrantmodif({setmodif, modifData,setEnterData}) {
    console.log(modifData)
    const {user,setSolde,solde} = useContext(MyContext)
    const [newSolde,setNewSolde] = useState(solde)
    const [inputVal,setInputVal] = useState({Motif: modifData.motif,Montant: modifData.montantEntre,idcle: modifData.idcle,date: (new Date()).toLocaleDateString()})

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios
        .put("http://localhost/api/ModifEnter",inputVal)
        .then(res=>{
            console.log(res)
            axios
            .put("http://localhost/api/entre",{ideglise: user.ideglise})
            .then(res=>{         
                setEnterData(res.data)
                setmodif(false)
            })
            .catch(err=>{
                console.log(err)
            })
             .catch(err=>console.log(err))
             setSolde(newSolde)
             axios
             .put("http://localhost/api/dataEglise",{ideglise: user.ideglise, Solde: newSolde})
             .then(res=>{
                 localStorage.setItem('user',JSON.stringify({ ideglise: user.ideglise, Design: user.Design, Solde: newSolde, EmailG: user.EmailG, Passwd: user.Passwd }))
             })
             .catch(err=>{
                 console.log(err)
             })
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        setNewSolde(parseInt(solde)-parseInt(modifData.montantEntre)+parseInt(inputVal.Montant))
     },[inputVal])

    const changeInput = (e)=>{
        const name = e.target.name
        setInputVal({ ...inputVal,
            [name] : e.target.value
        })
    }

    useEffect(() => {
        document.body.appendChild(div)
        return () => {
            document.body.removeChild(div)
        }
    }, [])


    return ReactDom.createPortal(
        <div className="modification">
            <form onSubmit={handleSubmit}>
                        <h2>Entrez les modifications De cette entrée</h2>
                        <label htmlFor="Motif">Motif :</label>
                        <input name="Motif" type="text" placeholder="Motif..." value={inputVal.Motif} onChange={changeInput}/>
                        <label htmlFor="Montant">Montant :</label>
                        <input name="Montant" type="number" placeholder="Montant..." value={inputVal.Montant} onChange={changeInput}/>
                        <button className="btn primary" type="submit">Enregistrer</button>
                        <button className="btn danger" type="reset" onClick={()=>setmodif(false)}>Annuler</button>
                    </form>
        </div>,div
    )
}

export default Entrantmodif
