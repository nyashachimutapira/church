import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Give from './pages/Give';
import Admin from './pages/Admin';
import CellGroups from './pages/CellGroups';
import Welcome from './pages/Welcome';
import Leadership from './pages/Leadership';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/give" element={<Give />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cell-groups" element={<CellGroups />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
