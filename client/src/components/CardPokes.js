import React from 'react';
import '../index.css';
import imagNotFound from '../assets/images/pok-search-not-found.jpg';
import imgNotload from '../assets/images/imgPokNotLoad.png'

export default function CardPokes(props) {
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  return (
    <>
      {props.msg ?
        <div className='cardPok'>
          <img src={imagNotFound} alt='imagePoke' />
          <h2 className='namePok'><p>Not Found</p></h2>
        </div> :

        <div className='cardPok'>
          <img src={props.image} onError={({currentTarget}) => {currentTarget.onerror = null; currentTarget.src= imgNotload}} alt='imagePoke' />
          <h2 className='namePok'><p>{props.name}</p></h2>
          <div className='typesPok'>
            {props.types && props.types.map((typ, index) => (
              <span style={{
                border: "solid 1px",
                borderColor: typeColor[typ],
                padding: "2px 5px",
                borderRadius: "8px",
                background: typeColor[typ],
                color: "white",
              }} key={index}>{typ}</span>
            ))}
          </div>

        </div>

      }

    </>

  )
}
