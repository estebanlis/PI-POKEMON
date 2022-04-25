import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


export default function CadPokesDetails(props) {

    let dispatch = useDispatch();

    useEffect (() =>{
        //return (() =>dispatch(clearPokDetail()));
    },[dispatch]);

    let hpCss = (props.hp/255)*100;
    console.log(hpCss.toString);
    const myStyle = {
      width :  `"${hpCss}%"`
    };
  return (
    <>
    <div className='cardPokDetail'>
   
        <div style={{margin:"auto"}}>
                
                <img src={props.image} alt='imagePoke'/>
                <h2 className='namePok'><p>{props.name}</p></h2>
            
           
        </div>

      <div className='moreDate'>
         {/*  <span>HP: {props.hp}</span> */}
         <div className='statsBar'>
          <p>HP</p>
          <div className="container-features">
                <div style={myStyle}>{props.hp}</div>
          </div>

         </div>
         

          <span>Attack: {props.attack}</span>
          <span>Defense: {props.defense}</span>
          <span>Speed: {props.speed}</span>
          <span>Height: {props.height}</span>
          <span>Weight: {props.weight}</span>
          <span>
           Type: {props.types && props.types.map((typ,index) =>(
            <span key={index}>{typ} </span>
            )) } 
          </span>

      </div>

    </div>
    
    
    
    
    </>
  )
}
