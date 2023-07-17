import React,{useEffect,useState,useContext} from 'react'
import MyContext from "../../Mycontext"
import axios from "axios"
import './hustograme.css'
import {Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js'
import {Pie} from "react-chartjs-2"
ChartJS.register(ArcElement,Tooltip,Legend)


function Histograme() {
    const [enterData, setEnterData] = useState([])
    const {user,setSolde} = useContext(MyContext)
    const {solde} = useContext(MyContext)
    // const solde = user.Solde
    const [spentData,setSpentData] = useState([])
    const [montantEntrant,setMontantEntrant] = useState(0)
    const [montantSortant,setMontantSortant] = useState(0)

    useEffect(() => {
        axios
        .put("http://localhost/api/entre",{ideglise: user.ideglise})
        .then(res=>{         
            setEnterData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

        axios
        .put("http://localhost/api/sortie",{ideglise: user.ideglise})
        .then(res=>{
            setSpentData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

        setSolde(JSON.parse(localStorage.getItem('user')).Solde)
    }, [])

    useEffect(() => {
        enterData.forEach(data=>{
            setMontantEntrant(prev=>parseFloat(data.montantEntre)+prev)
        })
    }, [enterData])
    useEffect(() => {
        spentData.forEach(data=>{
            setMontantSortant(prev=>parseFloat(data.montantSortie)+prev)
        })
    }, [spentData])

    return (
         <div className="histograme">
             <h2>Histograme du solde de compte</h2>
                <div className="histograme__conatiner">
                    
                    <Pie
                    width={300}
                    height={200}
                    data = {{
                        labels: ['Solde Total', 'Montant Entrant', 'Montant Sortie'],
                        datasets:[
                            {
                                label : "Ar",
                                data: [solde,montantEntrant,montantSortant],
                                backgroundColor:[
                                    '#7AC593',
                                    '#5bc6e4',
                                    '#e4ad5bd2'
                                ],
                                borderColor:[
                                    '#7AC593',
                                    'rgb(54, 168,235 )',
                                    'rgb(255, 206,86 )'
                                ],
                                borderWidth: 1,
                                
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        color:"white"
                    }}
                    />
                </div>

                <div className="compte">
                    <h3>Observation : </h3>
                    <small>Solde Total : <strong>{solde} Ar</strong></small>
                    <small>Montant entrant : <strong>{montantEntrant} Ar</strong></small>
                    <small>Montant sortant : <strong>{montantSortant} Ar</strong></small>
                    <small className="seuil">Seuil de montant : <strong>10000,00 Ar</strong></small>
                </div>
         </div>
    )
}

export default Histograme
