import './App.css';
import Regisztracio from './register';
import Kodbekuldes from './codeupload';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App container'>
      <BrowserRouter>
        <Routes>
          <Route path='/alexdemeter.github.io/Frontend-probafeladat/' element={<Kodbekuldes />}/>
          <Route path='/alexdemeter.github.io/Frontend-probafeladat/register/:email' element={<Regisztracio />}/>
        </Routes>
      </BrowserRouter>
        <div className="drops">
          <div className='drop drop-1'/>
          <div className='drop drop-2'/>
          <div className='drop drop-3'/>
          <div className='drop drop-4'/>
          <div className='drop drop-5'/>
        </div>
    </div>
  );
}

export default App;