import './index.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import SearchResult from './components/SearchResult';


function App() {
  return (

    <div className='contenedor'>
    
    <Routes>
      <Route path='/' element={<Navigate to='home'/>} />
      <Route path='/*' element={<Nav/>}>
        <Route path='home' element={<Home/>} />
        <Route path='search' element={<SearchResult/>} />
      </Route>
    </Routes>
    
    
    </div>
    // eslint-disable-next-line
    
  );
}

export default App;
