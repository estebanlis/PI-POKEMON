import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


export default function CadPokesDetails(props) {

    let dispatch = useDispatch();

    useEffect (() =>{
        //return (() =>dispatch(clearPokDetail()));
    },[dispatch]);

    let hpCss = ((props.hp/255)*100).toFixed(2);
    let attackCss = ((props.attack/190)*100).toFixed(2);
    let defenseCss = ((props.defense/230)*100).toFixed(2);
    let speedCss = ((props.speed/200)*100).toFixed(2);
    
  return (
    <>
    <div className='cardPokDetail'>
   
        <div style={{margin:"auto"}}>
                
                <img src={props.image} alt='imagePoke'/>
                <h2 className='namePok'><p>#{props.id} {props.name}</p></h2>
            
           
        </div>

      <div className='moreDate'>

      <span>Height: {props.height}</span>
          <span>Weight: {props.weight}</span>
         {/*  <span>HP: {props.hp}</span> */}
         <div className='statsBar'>
          <p>HP</p>
          <div className="container-features">
                <div className='skills HP' style={{width :  `${hpCss}% `}}>{props.hp}</div>
          </div>

         </div>
         <div className='statsBar'>
          <p>Attack</p>
          <div className="container-features">
                <div className='skills HP' style={{width :  `${attackCss}% `}}>{props.attack}</div>
          </div>

         </div>

         <div className='statsBar'>
          <p>Defense</p>
          <div className="container-features">
                <div className='skills HP' style={{width :  `${defenseCss}% `}}>{props.defense}</div>
          </div>

         </div>
         <div className='statsBar'>
          <p>Speed</p>
          <div className="container-features">
                <div className='skills HP' style={{width :  `${speedCss}% `}}>{props.speed}</div>
          </div>

         </div>
         

          
          
         
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
