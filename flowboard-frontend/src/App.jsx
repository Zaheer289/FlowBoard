import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Community from './pages/Community';
import Register from './pages/Register';
import Projects from './pages/Projects';
import './app.css';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Sidebar from './pages/components/Sidebar';
import { ProtectedRoute, PublicRoute } from './components/AuthGuards';

function App() {
  return(
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      
      {/* Public routes (redirect to dashboard if logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes (redirect to login if not logged in) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/community" element={<Community />} />
      </Route>

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  )
}

export default App;
