import React,{useEffect,useState} from 'react'
import Newspent from '../newSpent/Newspent'
import Sortantmodif from '../sortantmodif/Sortantmodif'
import axios from 'axios'
import './sortant.css'
import { useContext } from 'react'
import MyContext from '../../Mycontext'
import Fade from '../fade/Fade'
import Suppsortant from '../suppsortant/Suppsortant'

function Entrant() {
    const {user,setSolde,solde} = useContext(MyContext)
    const [newSolde,setNewSolde] = useState(solde)
    const [dateFilter, setdateFilter] = useState(false)
    const [add, setadd] = useState(false)
    const [spentData,setSpentData] = useState([])
    const [date1,setDate1] = useState('')
    const [date2,setDate2] = useState('')
    const [className,setClassName] = useState("")

   const [suppData,setSuppData] = useState(null)
   const [custumMess,setCustumMess] = useState(false)

    const [modif, setmodif] = useState(false)
    const [modifData, setModifData] = useState(null)
    
    const date = new Date()

    const [dateTime,setdateTime] = useState(new Date())

    const showMess=(param,param2)=>{
        setCustumMess(!custumMess)
        setSuppData(param)
        setNewSolde(parseInt(solde)+parseInt(param2))
    }
    const toDateS1 = (param)=>{
        let year = param.slice(0,4)
        let month = param.slice(5,7)
        let day = param.slice(8,10)
        setDate1(`${day}/${month}/${year}`)
       }
    const toDateS2 = (param)=>{
        let year = param.slice(0,4)
        let month = param.slice(5,7)
        let day = param.slice(8,10)
        setDate2(`${day}/${month}/${year}`)
       }
    const Modification = (param)=>{
        setModifData(param)
        setmodif(true)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setdateTime(new Date())
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [])

    const deleteIt = (idcle)=>{
        axios
        .patch("http://localhost/api/Suppsortie",{idcle})
        .then(res=>{
            console.log(res)
            
            axios
            .put("http://localhost/api/sortie",{ideglise: user.ideglise})
            .then(res=>{
                setSpentData(res.data)
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

    const handeleSearchSubmit = (e)=>{
        e.preventDefault()
        axios
        .post("http://localhost/api/searchSortie",{date1,date2,ideglise: user.ideglise})
        .then(res=>{
            setSpentData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const handeleSearchUsingLike = (e)=>{
        axios
        .post("http://localhost/api/searchSortieUsingLike",{like: e.target.value ,ideglise: user.ideglise})
        .then(res=>{
            setSpentData(res.data)
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        if(spentData.length > 5){
            setClassName("tableClase")
        }else{
            setClassName("")
        }
     },[spentData])

    useEffect(() => {
        axios
        .put("http://localhost/api/sortie",{ideglise: user.ideglise})
        .then(res=>{
            setSpentData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
    return (
    <>
        <div className="sortant">
            <h2>Mouvement <span>Sortant en Caisse</span></h2>
            <div className="content__top">
                <div className="left">
                    <span>Bonjour, un nouveau jour</span>
                    <small><strong>Exode 33:13 </strong> "Si réellement j'ai obtenu ta faveur, veuille me réveler <br/> tes intentions pour que je te connaisse..."</small>
                </div>
                <div className="right">
                    <small>{date.toDateString()}</small>
                    <span>{dateTime.toLocaleTimeString()}</span>
                </div>
            </div>
            <div className="content__bottom">
                <div className="heading">
                    <span className="heading__title">Table Sortie :</span>
                    <div className="actions">
                        <div className="search">
                            <h4>Recherche : </h4>
                            <input type="search" placeholder="Motif ici..." onFocus={()=>setdateFilter(false)} onChange={handeleSearchUsingLike}/>
                            <div className="filtrage">
                                <button onClick={()=>setdateFilter(!dateFilter)}>Filtrer par date</button>
                                {dateFilter?
                                <form onSubmit={handeleSearchSubmit} >
                                    <h4>Entre 2 dates :</h4>
                                    <input name="date1" type="date" onChange={(e)=>toDateS1(e.target.value)}/>
                                    <input name="date2" type="date" onChange={(e)=>toDateS2(e.target.value)}/>
                                    <button className="btn" type="submit">Confirmer</button>
                                </form> : null}
                            </div>
                        </div>
                        <button className="btn primary" onClick={()=>setadd(!add)}><span>Ajouter </span><i className="mdi mdi-plus"></i></button>
                    </div>
                </div>
                <div className={`table ${className}`}>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Motif</th>
                                <th>Montant</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spentData.map((data,index)=>{
                            return <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{data.motif}</td>
                                    <td>{data.montantSortie} Ar</td>
                                    <td>{data.dateSortie}</td>
                                    <td><button className="btn success" onClick={()=>Modification(data)}>Modifier</button> <button className="btn danger" onClick={()=>showMess(data.idcle,data.montantSortie)}>Supprimer</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {add?<Newspent setadd={setadd} spentData={spentData} setSpentData={setSpentData}/>:null}
        {modif? <Sortantmodif setmodif={setmodif} modifData={modifData} setSpentData={setSpentData}/> : null}
        {custumMess && <Fade>
               <Suppsortant setCustumMess={setCustumMess} deleteIt={deleteIt} suppData={suppData}/>
        </Fade>}
    </>
    )
}

export default Entrant