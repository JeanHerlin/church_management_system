import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ReactDom from 'react-dom' 
import './newspent.css'
import { useContext } from 'react'
import MyContext from '../../Mycontext'
import Seuil from '../seuil/Seuil'

const div = document.createElement('div')

function Newspent({setadd,spentData,setSpentData}) {
    const {user,setSolde,solde} = useContext(MyContext)
    const [newSolde,setNewSolde] = useState(solde)
    const [allSpent,setAllSpent] = useState([])
    const [acceptation,setAcceptation] = useState(false)


    const [inputVal,setInputVal] = useState({idcle: `sortie${spentData.length}`,ideglise: user.ideglise,Motif: "",dateSortie: (new Date()).toLocaleDateString(),Donneur: null ,Activity: "Sortant" ,Montant: ""})

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(parseInt(solde)-parseInt(inputVal.Montant)<10000){
            setAcceptation(true)
            console.log("Montant ambony lotra....")
            
        }else{
            axios
            .post("http://localhost/api/sortie",inputVal)
            .then(res=>{
                 console.log(res)
                axios
                .put("http://localhost/api/sortie",{ideglise: user.ideglise})
                .then(res=>{
                    setSpentData(res.data)
                    setadd(false)
                })
                .catch(err=>{
                    console.log(err)
                })
                
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
    }

    const changeInput = (e)=>{
        const name = e.target.name
        
        setInputVal({ ...inputVal,
        [name] : e.target.value
    }) 
        
       
    }

   console.log(acceptation)
    useEffect(() => {
        axios
        .get("http://localhost/api/sortie")
        .then(res=>{
            console.log(res)
            setAllSpent(res.data)
        })
        .catch(err=>console.log(err))

        document.body.appendChild(div)
        return () => {
            document.body.removeChild(div)
        }
    }, [])


    useEffect(()=>{
        setNewSolde(parseInt(solde)-parseInt(inputVal.Montant))
     },[inputVal])

    useEffect(() => {
        setInputVal({ ...inputVal,
            idcle: allSpent.length? `sortie${Math.random() * 10000000}` : `sortie0`

        })
    }, [allSpent])

    return ReactDom.createPortal(
        <>
        <div className="addSpent">
            <form onSubmit={handleSubmit}>
                        <h2>Mouvement de sortie en caisse </h2>
                        <input name="Motif" type="text" placeholder="Motif sortie..." value={inputVal.Motif} onChange={changeInput}/>
                        <input name="Montant" type="Number" placeholder="Montant sortie..." value={inputVal.Montant} onChange={changeInput}/>
                        <button type="submit" className="btn">Enregistrer</button>
                        <button type="reset" className="btn danger" onClick={()=>setadd(false)}>Annuler</button>
                    </form>
            {acceptation && <Seuil spent={inputVal.Montant} setAcceptation={setAcceptation} solde={solde}/>}
        </div>
        
        </>,div
    )
}

export default Newspent