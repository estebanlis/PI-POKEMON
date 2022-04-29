import './index.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import SearchResult from './components/SearchResult';
import PokeDetails from './components/PokeDetails';
import NewPokemon from './components/NewPokemon';
import LandingPage from './components/LandingPage';

function App() {
  return (

    <div className='contenedor'>
    
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/*' element={<Nav/>}>
        <Route path='home' element={<Home/>} />
        <Route path='search' element={<SearchResult/>} />
        <Route path='pokemon/:id' element={<PokeDetails/>} />
        <Route path='NewPokemon' element={<NewPokemon/>} />
      </Route>
    </Routes>
    
    
    </div>
    // eslint-disable-next-line
    
  );
}

export default App;
