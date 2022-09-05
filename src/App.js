import './App.css';
import { useState } from 'react';
import Dice from './components/Dice';
import DiceProperties from './DiceProperties';

function App() {

  const [diceProps, setDiceProps] = useState(DiceProperties);

  console.log(diceProps)

  function clickItem() {
    ///
  }

  function rollDice(){
    return ''
  }

  const dice = DiceProperties.map((item) =>{
    let randomDiceRoll = Math.floor(6*Math.random())+1
    //return {...item, value: randomDiceRoll}
    return <Dice key={item.id} clicked={diceProps.clicked} clickItem={clickItem}/>
  })

  return (
    <div className="app">
      <main>
        <h1 className='heading'>Tenzies</h1>
        <p className='paragraph'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {/*<Dice clicked={diceProps.clicked} clickItem={clickItem}/> */}
        <div className='dice-grid'>
          {dice}
        </div>
        <button onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
