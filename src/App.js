import './App.css';
import { useState } from 'react';
import Dice from './components/Dice';

function App() {

  const [clicked, setClicked] = useState(false);

  function clickItem() {
      return setClicked(prev => !prev)
  }

  function rollDice(){
    return null
  }

  return (
    <div className="app">
      <main>
        <h1 className='heading'>Tenzies</h1>
        <p className='paragraph'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <Dice clicked={clicked} clickItem={clickItem}/>
        <button onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
