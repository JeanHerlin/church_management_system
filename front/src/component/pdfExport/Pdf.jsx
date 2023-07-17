import React,{useEffect,useState,useRef} from 'react'
import { useContext } from 'react'
import MyContext from '../../Mycontext'

import {useReactToPrint} from 'react-to-print'

import axios from 'axios'
import './pdf.css'

function Pdf() {
    
    const compoPdf = useRef()

    const [dateFilter, setdateFilter] = useState(false)
    const [between,setBetween] = useState(false)
    const [date1,setDate1] = useState('')
    const [date2,setDate2] = useState('')

    const [enterData, setEnterData] = useState([])
    const {user} = useContext(MyContext)
    const [spentData,setSpentData] = useState([])
    const [montantEntrant,setMontantEntrant] = useState(0)
    const [montantSortant,setMontantSortant] = useState(0)

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

    const handeleSearchSubmit = (e)=>{
        e.preventDefault()
        axios
        .post("http://localhost/api/searchEnter",{date1,date2,ideglise: user.ideglise})
        .then(res=>{
            setEnterData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

        e.preventDefault()
        axios
        .post("http://localhost/api/searchSortie",{date1,date2,ideglise: user.ideglise})
        .then(res=>{
            setSpentData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

        if(date1!=="" && date2!==""){
            setBetween(true)
            setMontantEntrant(0)
            setMontantSortant(0)
        }
    }

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

    const generatePdf =  useReactToPrint({
        content: ()=>compoPdf.current,
        documentTitle: "ProjetPhp",
        onAfterPrint:()=>alert('Data enregistrer')
        
    })
    return (
        <div className="pdf">
            <div className="filtrage">
                                <button onClick={()=>setdateFilter(!dateFilter)}>Filtrer par date</button>
                                {dateFilter?
                                <form onSubmit={handeleSearchSubmit}>
                                    <h4>Entre 2 dates :</h4>
                                    <input name="date1" type="date" onChange={(e)=>toDateS1(e.target.value)}/>
                                    <input name="date2" type="date" onChange={(e)=>toDateS2(e.target.value)}/>
                                    <button className="btn" type="submit">Filtrer</button>
                                </form> : null}
                            </div>
            <div className="pdf__container" ref={compoPdf}>
                <h1>Mouvement de caisse</h1>
                {between && <h3>Entre deux dates : {date1} et {date2}</h3>}
                <div className="mouvementEntrant">
                    <h2>Mouvement d'entrée en caisse</h2>
                    <table>
                            <thead>
                                <tr>
                                    <th>Motif</th>
                                    <th>Montant</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>  
                            {enterData.map((data,index)=>{
                          return  <tr key={index}>
                                    <td>{data.motif}</td>
                                    <td>{parseFloat(data.montantEntre).toFixed(2)} Ar</td>
                                    <td>{data.dateEntre}</td>
                                </tr>
                        })}
                            </tbody>
                    </table>
                    <h4> Total montant entrant : <strong>{montantEntrant} Ar</strong></h4>
                </div>
                <div className="mouvementSortant">
                    <h2>Mouvement de sortie de caisse</h2>
                    <table>
                            <thead>
                                <tr>
                                    <th>Motif</th>
                                    <th>Montant</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>  
                            {spentData.map((data,index)=>{
                            return <tr key={index}>
                                    <td>{data.motif}</td>
                                    <td>{data.montantSortie} Ar</td>
                                    <td>{data.dateSortie}</td>
                                </tr>
                            })}
                            </tbody>
                    </table>
                    <h4> Total montant entrant : <strong>{montantSortant} Ar</strong></h4>
                </div>
            </div>
            <div className="pdf__btn">
              <button className="btn" onClick={generatePdf}>Exporter en pdf</button>
            </div>
        </div>
    )
}

export default Pdf
