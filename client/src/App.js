import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayAll from './components/DisplayAll';
import Create from './components/Create';
import Show from './components/Show';
import Edit from './components/Edit';


function App() {
  const [stores, setStores] = useState([])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAll setStores={setStores} stores={stores} />} />
          <Route path="/stores/add" element={<Create/>} />
          <Route path="/stores/:id" element={<Show/>} />
          <Route path="/stores/edit/:id" element={<Edit setStores={setStores} stores={stores} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
