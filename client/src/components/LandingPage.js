import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {

    let b= false;
    const letsGo = () => {b=true;}
    console.log(b)
  return (
      <div className="center-on-page">

          <Link to='/home'><div onMouseOver={() => letsGo()} className="pokeball">
              <div className="pokeball__button"></div>
          </div></Link>
          {b ? <div className='letsGo'>Let's Go</div> : null}

      </div>
  )
}
