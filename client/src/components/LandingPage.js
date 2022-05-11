import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setFlag } from '../actions';

export default function LandingPage() {

    const [show, setShow] = useState(false)
    let dispatch = useDispatch();

    useEffect(() => {
      dispatch(setFlag(true));
      return () => {
        document.getElementById('body').className='';
        setShow(false)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const letsGo = () => { 
        document.getElementById('body').className='landing';
        setShow(true); }

    setTimeout(() => { setShow(true) }, 6000)


    return (
        <div className="center-on-page">

            <Link to='/home'><div onMouseOver={() => letsGo()} onMouseOut={() => document.getElementById('body').className=''}className="pokeball">
                <div className="pokeball__button"></div>
            </div></Link>
            {show ? <Link to='/home' style={{ color: "black" }}><div className='letsGo'>Let's Go!</div></Link> : null}

        </div>
    )
}
