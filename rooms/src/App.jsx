import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RoomList from './components/Room/RoomList';
import RoomDetail from './components/Room/RoomDetail';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RoomList />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;