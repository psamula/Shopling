import Start from './Sites/Start/Start';
import Login from './Sites/Login/Login';
import Lists from './Sites/Lists/Lists';
import List from './Sites/List/List';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Start/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/Lists" element={<Lists/>}/>
      <Route exact path="/List" element={<List/>}/>
      </Routes>
    </Router>
  )
}

export default App;
