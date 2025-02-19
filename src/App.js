import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Courses from './pages/Courses';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="nav-bar">
              <li className="nav-item"><Link to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link to="/about">About</Link></li>
              <li className="nav-item middle"><Link to="/">Home</Link></li>
              <li className="nav-item"><Link to="/reviews">Reviews</Link></li>
              <li className="nav-item"><Link to="/courses">Courses</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
