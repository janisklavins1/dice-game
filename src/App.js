import './App.css';
import Dice from './components/Dice';

function App() {
  return (
    <div className="app">
      <main>
        <h1 className='heading'>Tenzies</h1>
        <p className='paragraph'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <Dice />
        <button>Roll</button>
      </main>
    </div>
  );
}

export default App;
