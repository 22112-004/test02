import React from 'react';
import { Layout } from './components/Layout';
import { GameProvider } from './context/GameContext';
import { Game } from './components/Game';

function App() {
  return (
    <GameProvider>
      <Layout>
        <Game />
      </Layout>
    </GameProvider>
  );
}

export default App;