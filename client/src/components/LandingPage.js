import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {

    const [show,setShow]=useState(false)

    const letsGo = () =>{setShow(true)}
    
    
  return (
      <div className="center-on-page">

          <Link to='/home'><div onMouseOver={() => letsGo()} className="pokeball">
              <div className="pokeball__button"></div>
          </div></Link>
          {show ? <Link to='/home'style={{color:"black"}}><div className='letsGo'>Let's Go!</div></Link> : null}

      </div>
  )
}
