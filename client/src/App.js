import './index.css';
import {Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';


function App() {
  return (

    <div className='contenedor'>
    <Nav />
    <Routes>

      <Route path='home' element={<Home/>} />
      
    </Routes>
    
    
    </div>
    // eslint-disable-next-line
    
  );
}

export default App;
