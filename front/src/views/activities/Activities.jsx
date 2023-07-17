import React,{useEffect, useState} from 'react'
import Activity from '../../component/activity/Activity'
import Loader from '../../component/loader/Loader.jsx'
import axios from 'axios'
import './activities.css'
import { useContext } from 'react'
import MyContext from '../../Mycontext'

function Activities() {
    const {user,setSolde} = useContext(MyContext)
    const {solde} = useContext(MyContext)
    const [pagination,setPagination]=useState(false)
    const [activities,setActivities] = useState([])
    const [allActivities,setAllActivities] = useState([])
    const [showNext,setShowNext] = useState(true)
    const [showPrev,setShowPrev] = useState(false)
    const [datalength,setLength] = useState(0)
    const [loading,setLoading] = useState(true)

    const next = ()=>{
        const newdata = [] 
        let k=datalength
     for(let i=0;i<4;i++){
         
         if(k<=0){
            setShowNext(false)
         }else{
            newdata.push(allActivities[k-1])
            setActivities(newdata)
            k=k-1;
         }
        
     }
     if(k===0){

        setShowNext(false)
     }
     setLength(k)
     console.log(datalength)
     setShowPrev(true)
    }

    const prev = ()=>{
        const newdata = [] 
        let k=datalength
     for(let i=0;i<4;i++){
         
         if(k>=allActivities.length){
            setShowPrev(false)
           
         }else{
            newdata.push(allActivities[k+1])
            setActivities(newdata)
            k=k+1;
         }
        
     }
     if(k>=allActivities.length-4){
        setShowPrev(false)
        setLength(allActivities.length-4)
     }else{
         setLength(k)
     }
     
     console.log(datalength)
     setShowNext(true)
    }

    useEffect(()=>{
     let timer = setTimeout(() => {
         setLoading(false)
     }, 500);
     setSolde(JSON.parse(localStorage.getItem('user')).Solde)
     return ()=>clearTimeout(timer)
    },[])

    useEffect(() => {
        axios
        .put("http://localhost/api/activities",{ideglise: user.ideglise})
        .then(res=>{
            setAllActivities(res.data)
            setLength(res.data.length)
            if(res.data.length>4){
                setPagination(true)
                const newdata = [] 
                for(let i=1;i<=4;i++){                  
                newdata.push(res.data[res.data.length-i])
                setActivities(newdata)
                }
                setLength(prs=>prs-4) 
            }else{
                setActivities(res.data)
            }
            
        })
        .catch(err=>{
            console.log(err)
        })

    }, [])

    return (
        <div className="activities__container">
            <div className="activities__left-container">
                <div className="top">
                    <div>
                        <span>Nombre Total d'activiés</span>
                        <strong>{allActivities.length}</strong>
                    </div>
                    <div>
                        <span>Vos activités</span>
                        <i className="mdi mdi-bell-outline"></i>
                    </div>
                </div>
                <div className="content">
                    <div className="heading">
                        <span>Mouvement récent : </span>
                        <div className="filter"><small>Filtrer </small><i className=" mdi mdi-menu-down"></i></div>
                    </div>
                    {loading? <Loader/>:<div className="mouvement">
                        {activities.map((data,index)=>{
                            return (data && <Activity key={index} data={data}/>)
                        })}
                        {pagination && <div className="pagination">{showPrev && <button className="btn" onClick={prev}>Precedant</button>}  {showNext&&<button className="btn" onClick={next}>Afficher plus</button>}</div>}
                    </div>}
                </div>
            </div>

            <div className="activities__right-container">
                <div className="top">
                    <span>Total Solde :</span>
                    <i className=" mdi mdi-dots-vertical"></i>
                </div>
                <span> Ar {parseFloat(solde).toFixed(2)}</span>
                <small>Exode 33: 18 : "...Permets moi de contempler ta gouloire..."</small>
                <div className="bottom">
                    <div className="top">
                        <span>Le seuil de montant: </span>
                        <strong> Ar 10000,00</strong>
                        <small>Votre solde ne devrait pas être inferieur à ce seuil une fois il y a de l'argent dans votre compte</small>
                    </div>
                    <div className="date">
                        <small>12/03/2023</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activities
