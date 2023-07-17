import React,{useState,useEffect} from 'react'
import axios, { all } from 'axios'
import ReactDom from 'react-dom' 
import './newenter.css'
import { useContext } from 'react'
import MyContext from '../../Mycontext'

const div = document.createElement('div')

function Newenter({setadd,enterData,setEnterData}) {
    const {user,setSolde,solde} = useContext(MyContext)
    const [newSolde,setNewSolde] = useState(solde)
    const [allEnter,setAllEnter] = useState([])

    const [inputVal,setInputVal] = useState({idcle: `enter${enterData.length}`,ideglise: user.ideglise,Motif: "",dateEnter: (new Date()).toLocaleDateString(),Donneur: "",Activity: "Don" ,Montant: ""})

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios
        .post("http://localhost/api/entre",inputVal)
        .then(res=>{
            console.log(res)
            axios
            .put("http://localhost/api/entre",{ideglise: user.ideglise})
            .then(res=>{         
                setEnterData(res.data)
                setadd(false)
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

    const changeInput = (e)=>{
        const name = e.target.name
        setInputVal({ ...inputVal,
            [name] : e.target.value
        })
    }


    useEffect(() => {
        axios
        .get("http://localhost/api/entre")
        .then(res=>{
            console.log(res.data)
            setAllEnter(res.data)
        })
        .catch(err=>console.log(err))

        document.body.appendChild(div)
        return () => {
            document.body.removeChild(div)
        }
    }, [])

    
    useEffect(()=>{
       setNewSolde(parseInt(solde)+parseInt(inputVal.Montant))
       console.log(inputVal)
    },[inputVal])

    useEffect(() => {
        setInputVal({ ...inputVal,
            idcle: allEnter.length? `enter${Math.random() * 10000000}`: `enter0`
        })
    }, [allEnter])


    return ReactDom.createPortal(
        <div className="addEnter">
            <form onSubmit={handleSubmit}>
                        <h2>Mouvement d'entrée en caisse </h2>
                        <input name="Motif" type="text" placeholder="Motif..." value={inputVal.Motif} onChange={changeInput}/>
                        <input name="Donneur" type="text" placeholder="Donneur (facultatif)..." value={inputVal.Donneur} onChange={changeInput}/>
                        <div>
                            <label>Type activité entrant: </label>
                            <select name="Activity" value={inputVal.Activity} onChange={changeInput}>
                                <option value="Don">Don</option>
                                <option value="Rakitra">Rakitra</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                        <input name="Montant" type="Number" placeholder="Montant..." value={inputVal.Montant} onChange={changeInput}/>
                        <button type="submit" className="btn">Enregistrer</button>
                        <button type="reset" className="btn danger" onClick={()=>setadd(false)}>Annuler</button>
                    </form>
        </div>,div
    )
}

export default Newenter