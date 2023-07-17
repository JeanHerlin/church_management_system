import ReactDom from 'react-dom'
import React,{useEffect} from 'react'
import './fade.css'

const div = document.createElement('div')

function Fade({children}) {

    document.body.appendChild(div)

    useEffect(()=>{
        return(()=>{
            document.body.removeChild(div)
        })
    },[])

    return ReactDom.createPortal(
        <div className="fade">
            {children}
        </div>,div
    )
}

export default Fade