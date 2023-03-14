
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home';
import CoinPage from './Component/CoinPage';
import Header from './Component/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<Home />}></Route>
          <Route path="/coins/:id" element={<CoinPage />}></Route>

        </Routes>


      </BrowserRouter>

    </div>
  );
}

export default App;
