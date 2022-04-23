import React from 'react'

export default function CadPokesDetails(props) {
  return (
    <>
    <div className='cardPokDetail'>
      <img src={props.image} alt='imagePoke'/>
      <h2 className='namePok'><p>{props.name}</p></h2>
      <div className='typesPok'>
         {props.types && props.types.map((typ,index) =>(
             <span key={index}>{typ}</span>
         )) } 
      </div>
      <div className='moreDate'>
          <span>HP: {props.hp}</span>
          <span>Attack: {props.attack}</span>
          <span>Defense: {props.defense}</span>
          <span>Speed: {props.speed}</span>
          <span>Height: {props.height}</span>
          <span>Weight: {props.weight}</span>

      </div>

    </div>
    
    
    
    
    </>
  )
}
