import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../actions';


export default function CadPokesDetails(props) {

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

  let dispatch = useDispatch();

  useEffect(() => {
    return (() => dispatch(setLoading(true)));
  }, [dispatch]);

  let hpCss = ((props.hp / 255) * 100).toFixed(2);
  let attackCss = ((props.attack / 190) * 100).toFixed(2);
  let defenseCss = ((props.defense / 230) * 100).toFixed(2);
  let speedCss = ((props.speed / 200) * 100).toFixed(2);

  return (
    <>
      <div className='cardPokDetail'>

        <div style={{ margin: "auto" }}>

          <img src={props.image} alt='imagePoke' />
          <h2 className='namePok'><p>#{props.id} {props.name}</p></h2>


        </div>

        <div className='moreDate'>
          <div className='heightWeightPok'>
            <span>Height: {props.height}</span>
            <span>Weight: {props.weight}</span>

          </div>


          <div className='statsBar'>
            <p>HP</p>
            <div className="container-features">
              <div className='skills HP' style={{ width: `${hpCss}% ` }}>{props.hp}</div>
            </div>

          </div>
          <div className='statsBar'>
            <p>Attack</p>
            <div className="container-features">
              <div className='skills HP' style={{ width: `${attackCss}% ` }}>{props.attack}</div>
            </div>

          </div>

          <div className='statsBar'>
            <p>Defense</p>
            <div className="container-features">
              <div className='skills HP' style={{ width: `${defenseCss}% ` }}>{props.defense}</div>
            </div>

          </div>
          <div className='statsBar'>
            <p>Speed</p>
            <div className="container-features">
              <div className='skills HP' style={{ width: `${speedCss}% ` }}>{props.speed}</div>
            </div>

          </div>





          <div className='typesPok'>
            {props.types && props.types.map((typ, index) => (
              <span key={index}
                style={{
                  border: "solid 1px",
                  borderColor: typeColor[typ],
                  padding: "2px 5px",
                  borderRadius: "8px",
                  background: typeColor[typ],
                  color: "white",
                }}>{typ} </span>
            ))}
          </div>

        </div>

      </div>




    </>
  )
}
