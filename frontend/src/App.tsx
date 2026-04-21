import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './components/lobby/HomeScreen';
import { RoomLobby } from './components/lobby/RoomLobby';
import { GameBar } from './components/hud/GameBar';
import { EndGameOverlay } from './components/endgame/EndGameOverlay';
import { useSocket } from './hooks/useSocket';
import { useOrientation } from './hooks/useOrientation';

function App() {
  useSocket();
  useOrientation();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <GameBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/sala=:roomId" element={<RoomLobby />} />
        </Routes>
        <EndGameOverlay />
      </div>
    </Router>
  );
}

export default App;