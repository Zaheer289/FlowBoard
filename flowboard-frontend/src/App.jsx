import {Routes, Route, Link} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Community from './pages/Community';
import Register from './pages/Register';
import Projects from './pages/Projects';
import './app.css';

function App() {
  return(
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/community" element={<Community />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  )
}

export default App;
