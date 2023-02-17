
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home';
import Coin from './Component/Coin';
import Header from './Component/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<Home />}></Route>
          <Route path="/coin" element={<Coin />}></Route>

        </Routes>


      </BrowserRouter>

    </div>
  );
}

export default App;
