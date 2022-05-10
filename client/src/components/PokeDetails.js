import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import CardPokesDetails from './CadPokesDetails';
import { getPokById, clearPokDetail, setMsgDbFail } from '../actions';
import PageNotFound from './PageNotFound';
import arrowLeft from '../assets/images/arrow-left.svg';
import arrowRight from '../assets/images/arrow-right.svg';

export default function PokeDetails() {
  let { id } = useParams();
  let msgFromDb = useSelector(state => state.msgDbFail);
  console.log('idParams: ', id)
  let load = useSelector(state => state.loading);
  let pok = useSelector(state => state.pokDetail);
  let pokTemp = useSelector(state => state.pokTemp);
  let dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  console.log('tamPok: ', pokTemp.length)
  useEffect(() => {

    dispatch(getPokById(id));
    return () => {
      dispatch(clearPokDetail());
      dispatch(setMsgDbFail(false));
      console.log('pase return pokedetails')
    }

  }, [id]);
  let paramasQuery = searchParams.get('index');
  console.log('paramasQuery: ', paramasQuery)
  let currentIndexPok = searchParams.get('index');
  console.log('query: ', currentIndexPok);
  let indexPrev = 0;
  let indexNext = 0;
  if (currentIndexPok) {
    let currentIndexPokNum = Number(currentIndexPok);
    if (currentIndexPokNum >= 0 && pokTemp.length) {
      if (currentIndexPokNum < pokTemp.length - 1) {
        indexNext = currentIndexPokNum + 1;
      }
      console.log('indexNext: ', indexNext)
      if (currentIndexPokNum >= 0) {
        indexPrev = currentIndexPokNum - 1;
      }
      console.log('indexPrev: ', indexPrev)
    }
  }
  if (msgFromDb) {
    return <PageNotFound />
  }

  return (

    <>
      <div className='homeContent'>

        {load ? <div className="pokemonLoader"></div> :
          <CardPokesDetails key={pok.id} id={pok.id} name={pok.name} image={pok.image} types={pok.type}
            hp={pok.hp} attack={pok.attack} defense={pok.defense} speed={pok.speed} height={pok.height} weight={pok.weight} />
        }
        {load ? null : 
            <div>
              {currentIndexPok && pokTemp.length > 0 ? <Link to={`/pokemon/${pokTemp && indexPrev >= 0 ? pokTemp[indexPrev].id : null}?index=${indexPrev}`} style={indexPrev >= 0 ? null : {pointerEvents: "none"}}>
                <span className='arrowLeft' style={indexPrev >= 0 ? null : { backgroundColor: "#c9c6c6"}}></span>
              </Link> : null}
              <Link to='/home'><span style={{ fontWeight: "600" }}> Back </span></Link>
              {currentIndexPok && pokTemp.length > 0 ? <Link to={`/pokemon/${pokTemp && indexNext <= pokTemp.length - 1 ? pokTemp[indexNext].id : null}?index=${indexNext}`} style={indexNext <= pokTemp.length - 1 && indexNext > 0 ? null : { pointerEvents: "none"}}>
                <span className='arrowRight' style={indexNext <= pokTemp.length - 1 && indexNext > 0 ? null : { backgroundColor: "#c9c6c6"}}></span>
              </Link> : null}

            </div> 
        }


      </div>
    </>
  )
}
