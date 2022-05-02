import React from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/images/PagenotFound.png';


export default function PageNotFound() {
  return (
      <>
       <div className='homeContent'>

       <div className='cardPokDetail'>
           <img src={image} alt='Page not found' />
       </div>

       <Link to='/home'><span style={{fontWeight: "600"}}>Back</span></Link> 


       </div>
      </>
   
  )
}
