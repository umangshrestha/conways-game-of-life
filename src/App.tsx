import { useEffect } from 'react';
import './styles/App.css';
import { Footer } from './components/footer';
import { GameOfLife } from './components/game-of-life';
import { TITLE } from './constants/meta';
import { Options } from './components/options';

const App = () => {
  useEffect(() => {
    document.title = TITLE
  }, [])

  return (
    <div className="App" >
      <Options />
      <h1>{TITLE}</h1>
      <GameOfLife />
      <Footer />
    </div >
  );
}

export default App;
