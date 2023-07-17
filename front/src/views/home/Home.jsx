import logo from '../../assets/Logo.png'
import bible from '../../assets/livre.png'
import React, { useState,useContext } from 'react'
import Activties from '../activities/Activities'
import Entrant from '../../component/entrant/Entrant'
import Sortant from '../../component/sortant/Sortant'
import Auth from '../auth/Auth'
import MyContext from '../../Mycontext'
import Pdf from '../../component/pdfExport/Pdf'
import Histograme from '../../component/histograme/Histograme'
import './home.css'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const {user,signUp,setsignUp} = useContext(MyContext)
    const [viewHome, setviewHome] = useState(true)
    const [viewEnter, setviewEnter] = useState(false)
    const [viewSpent, setviewSpent] = useState(false)
    const [viewPdf, setviewPdf] = useState(false)
    const [viewChart, setviewChart] = useState(false)
    const [active,setActive] = useState(1)


  const toggleActive = (param)=>{
      setActive(param)
  }

  const deconnexion = ()=>{
      localStorage.removeItem('user')
      navigate('/auth')
      window.location.reload()
  }
  const setActiveStyle = (param)=>{
      if(param === active){
          return "active"
      }else{
          return""
      } 

  }

   const showHome = ()=>{
       setviewHome(true)
       setviewEnter(false)
       setviewSpent(false)
       setviewChart(false)
       setviewPdf(false)
   }

   const showEnter = ()=>{
    setviewHome(false)
    setviewEnter(true)
    setviewSpent(false)
    setviewPdf(false)
    setviewChart(false)
}

const showSpent = ()=>{
    setviewHome(false)
    setviewEnter(false)
    setviewSpent(true)
    setviewChart(false)
    setviewPdf(false)
}

const showChart = ()=>{
    setviewHome(false)
    setviewEnter(false)
    setviewSpent(false)
    setviewChart(true)
    setviewPdf(false)
}
const showPdf = ()=>{
    setviewHome(false)
    setviewEnter(false)
    setviewSpent(false)
    setviewChart(false)
    setviewPdf(true)
}

    if(!user) return <Auth signUp={signUp} setsignUp={setsignUp}/>
    return (
        <div className="home">
            <div className="leftSide">
                <div className="top">
                    <div className="logo">
                       <img src={logo} alt="logo"/>
                    </div>
                    <div className="navigation">
                        <div className={setActiveStyle(1)} onClick={()=>{showHome();toggleActive(1)}}><i className="mdi mdi-city"></i><span>Accueil</span></div>
                        <div className={setActiveStyle(2)} onClick={()=>{showEnter();toggleActive(2)}}><i className="mdi mdi-bank"></i><span>Entrant en caisse</span></div>
                        <div className={setActiveStyle(3)} onClick={()=>{showSpent();toggleActive(3)}}><i className="mdi mdi-wallet-giftcard"></i><span>Sortant en caisse</span></div>
                        <div className={setActiveStyle(4)} onClick={()=>{showPdf();toggleActive(4)}}><i className="mdi mdi-file-pdf"></i><span>Exportation pdf</span></div>
                        <div className={setActiveStyle(5)} onClick={()=>{showChart();toggleActive(5)}}><i className=" mdi mdi-chart-areaspline"></i><span>Histograme</span></div>
                        <div onClick={deconnexion}><i className=" mdi mdi-logout"></i><span>Se deconnecter</span></div>
                    </div>
                </div>
                <div><span>By Pomme de Terre Bizarre</span></div>
            </div>
            <div className="rightSide">
                <div className="top">
                    <div className="">
                        <span>{user.Design}</span>
                        <input type="text" placeholder="recherche"/>
                    </div>
                    <div className="bible">
                        <img src={bible} alt=""/>
                    </div>
                </div>

                <div className="bottom">
                    <div className="rightSide__bottom-container">
                             {viewHome? <Activties/> : null}
                             {viewEnter? <Entrant/> : null}
                             {viewSpent? <Sortant/> : null}
                             {viewPdf? <Pdf/> : null}
                             {viewChart? <Histograme/> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
