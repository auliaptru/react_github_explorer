import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Repos from './components/repos/Repos';
import RepoDirs from './components/repodirs/RepoDirs';
import Home from './pages/Home/Home';
import './App.css';

function App() {
    return (
        <div className='app'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/repo/:query' element={<Repos />} />
                <Route path='/repo/:user/:name' element={<RepoDirs />} />
            </Routes>
        </div>
    );
}

export default App;
