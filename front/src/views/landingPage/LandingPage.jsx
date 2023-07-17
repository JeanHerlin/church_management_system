import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../assets/Logo.png'
import './landing.css'

function LandingPage({setsignUp}) {
    return (
        <div className="landingpage">
            <header>
                <div className="container">
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="auth">
                        <Link to="auth"><button className="signIn btn" onClick={()=>setsignUp(false)}>Conneter</button></Link>
                        <Link to="auth"><button className="signUp btn" onClick={()=>setsignUp(true)}>Créer une église</button></Link>
                    </div>
                </div>
            </header>
            <div className="landingpage__container">
                <div className="langding__overlay">
                    <div className="header container">
                        <div className="content">
                            <span>Créer un Compte et gérer votre église </span>
                            <p>Cette application vous permer d'observer les transactions dans votre église
                                 en vous creant un compte et y connecter</p>
                                 <Link to="auth"><button className="btn" onClick={()=>setsignUp(true)}>Commencer</button></Link>
                        </div>
                        <div className="content">
                            <img src="" alt=""/>
                        </div>
                    </div>

                    <div className="slider__container container">
                        <div className="content">
                            <i className="mdi mdi-hospital-building"></i>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                 Dolores a magni quibusdam unde excepturi veritatis
                                  laudantium molestiae quas vel corporis?</p>
                        </div>

                        <div className="content">
                            <i className="mdi mdi-home-map-marker"></i>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                 Dolores a magni quibusdam unde excepturi veritatis
                                  laudantium molestiae quas vel corporis?</p>
                        </div>

                        <div className="content">
                            <i className="mdi mdi-image-filter-drama"></i>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                 Dolores a magni quibusdam unde excepturi veritatis
                                  laudantium molestiae quas vel corporis?</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container">
                    <div>
                        <span>Copyrigth By Team Pomme de Terre Bizarre</span>
                    </div>
                </div>   
            </footer>
        </div>
    )
}

export default LandingPage
