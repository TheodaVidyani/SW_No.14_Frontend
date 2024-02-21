import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Selecttest from './Selecttest';
import AddTest from './Admin/AddTest';
import AdminInterface from './Admin/AdminInterface';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='AdminInterface' element={<AdminInterface/>}/>
      <Route path='Selecttest' element={<Selecttest/>}/>
      <Route path='AddTest' element={<AddTest/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
