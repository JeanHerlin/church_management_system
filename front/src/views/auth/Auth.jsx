import React,{useEffect,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/Logo.png'
import auth from '../../assets/churchAuth.png'
import './auth.css'
import { useContext } from 'react'
import MyContext from '../../Mycontext'
import axios from 'axios'

function Auth({signUp,setsignUp}) {

    const {dataEglise,setDataEglise,setUser} = useContext(MyContext)
    const [verify,setVerify] = useState(false)
    const [redClasse,setRedClasse] = useState("")
    const [confirmPasse,setConfrimPasse] = useState(false)
    const navigate = useNavigate()

    const [signupVal,setSignupVal] = useState({ideglise:"",Design: "",EmailG: "" ,Password: "",PassConfirme:"",Solde: 0})
    const [loginMail,setLoginMail] = useState("")
    const [loginPass,setLoginPass] = useState("")


    const changeInput = (e)=>{
        const name = e.target.name
        setSignupVal({ ...signupVal,
            [name] : e.target.value
        })
    }

 // Login data
    const handleLoginmail = (e)=>{
        setLoginMail(e.target.value)
    }

    const handleLoginpass = (e)=>{
        setLoginPass(e.target.value)
    }

    const handleLoginSubmit = (e)=>{
        e.preventDefault()
        axios
        .post("http://localhost/api/login",{email: loginMail, password: loginPass})
        .then(res=>{
            console.log(res)
            if(res.data[0]){
                localStorage.setItem("user",JSON.stringify(res.data[0]))
                setUser(res.data[0])
                navigate("/home")
            }else if(res.data.length===0){
                console.log("verifier")
                setVerify(true)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

// Sign up Submit
    const handleSignupSubmit = (e)=>{
        e.preventDefault()
        if(signupVal.Password === signupVal.PassConfirme){
            axios
            .post("http://localhost/api/signUp",signupVal)
            .then(res=>{
                if(res.data){
                    setsignUp(false)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            setConfrimPasse(true)
            setRedClasse("red")
        }
    }

    useEffect(() => {
        setSignupVal({...signupVal,
            ideglise : dataEglise.length? `E${dataEglise.length}` : "E0"})

    }, [dataEglise])
    console.log(signupVal)


    useEffect(() => {
        axios
        .get("http://localhost/api/dataEglise")
        .then(res=>{
            setDataEglise(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])

    return (
        <div className="auth__container">
            <header>
                <div className="container">
                   <Link to="/">
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                        </div>
                    </Link>
                    <div className="app__name">
                        <span>L'église</span>
                    </div>
                </div>
            </header>
            <div className="container">
                {signUp?
                <form onSubmit={handleSignupSubmit}>
                    <h3>Création d'une église</h3>
                    {confirmPasse && <h5>Vos mots de passe ne sont pas identique !</h5>}
                    <div>
                        <input type="text" placeholder=" " name="Design" value={signupVal.Design} onChange={changeInput}/>
                        <label >Nom De L'eglise</label>
                    </div>
                    <div>
                        <input type="email" placeholder=" " name="EmailG" value={signupVal.EmailG} onChange={changeInput}/>
                        <label >Email du gérant</label>
                    </div>
                    <div>
                        <input className={`${redClasse}`} type="password" placeholder=" " name="Password" value={signupVal.Password} onChange={changeInput}/>
                        <label>Mot de passe</label>
                    </div>
                    <div>
                        <input className={`${redClasse}`} type="password" placeholder=" " name="PassConfirme" value={signupVal.PassConfirme} onChange={changeInput}/>
                        <label >Confirmer mot de passe</label>
                    </div>
                    <button className="btn" type="submit">Créer</button>

                    <span>J'ai déjà un compte? <span onClick={()=>setsignUp(false)}>se connecter</span></span>
                </form> 
                : 
                <form onSubmit={handleLoginSubmit}>
                <h3>Connexion</h3>
                {verify && <h5>Verifier vos informations !</h5>}
                <div>
                    <input type="email" placeholder=" " name="Email" value={loginMail} onChange={handleLoginmail}/>
                    <label >Email du gérant</label>
                </div>
                <div>
                    <input type="password" placeholder=" " name="Passwd" value={loginPass} onChange={handleLoginpass}/>
                    <label >Mot de passe</label>
                </div>
                <button className="btn" type="submit">Connecter</button>

                <span>Je n'ai pas encore un compte? <span onClick={()=>setsignUp(true)}>creez en un</span></span>
             </form>}
                <div className="illustration">
                     <img src={auth} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Auth
