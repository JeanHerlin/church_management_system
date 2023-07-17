import './app.css'
import React,{useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import LandingPage from './views/landingPage/LandingPage'
import Auth from './views/auth/Auth'
import Home from './views/home/Home'
import MyContext from './Mycontext'

function App () {
    const [signUp, setsignUp] = useState(false)
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [dataEglise,setDataEglise] = useState([])
    const [solde,setSolde] = useState(user? user.Solde : 0)

    return(

        <div className='App'>
           <MyContext.Provider value={{dataEglise,setDataEglise,user,setUser,signUp,setsignUp,solde,setSolde}}>
                <Routes>
                    <Route path="/" element={<LandingPage setsignUp={setsignUp}/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/auth" element={<Auth signUp={signUp} setsignUp={setsignUp}/>}/>
                </Routes>
           </MyContext.Provider>
        </div>

    )
}

export default App;