import './App.css';
import { useEffect, useState } from 'react';
import Dice from './components/Dice';
import DiceProperties from './DiceProperties';
import Confetti from 'react-confetti'


/*
TODO
  Confetti proper render based on screen size params
  Fix winner announcement only when all boxes clicked
  Clean up code
*/

function App() {

  const [diceProps, setDiceProps] = useState(DiceProperties);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    return checkWinner()
  }, [diceProps])

  function checkWinner() {
    for (let i = 0; i < diceProps.length; i++) {
      if (diceProps[i].value !== diceProps[0].value) {
        return setIsWinner(false)
      }
    }
    return setIsWinner(true)
  }

  function clickItem(diceId) {
    return setDiceProps(prevDiceProps => {
      const newDiceProps = []
      for (let i = 0; i < prevDiceProps.length; i++) {
        const currentDice = prevDiceProps[i]
        if (currentDice.id === diceId) {
          newDiceProps.push({ ...currentDice, clicked: !currentDice.clicked })
        } else {
          newDiceProps.push(currentDice)
        }
      }
      return newDiceProps
    })
  }

  function rollDice() {
    setDiceProps(prevDiceProps => {
      const newDiceProps = []
      for (let i = 0; i < prevDiceProps.length; i++) {
        const diceProps = prevDiceProps[i];
        if (!diceProps.clicked) {
          newDiceProps.push({ ...diceProps, value: Math.floor(6 * Math.random()) + 1 })
        } else {
          newDiceProps.push(diceProps)
        }
      }
      return newDiceProps
    })
  }

  function reset() {
    setIsWinner(false)
    setDiceProps(prevDiceProps => {
      return prevDiceProps.map(item => {
        return { ...item, value: Math.floor(6 * Math.random()) + 1 }
      })
    })
  }

  const dice = diceProps.map((item) => {
    return <Dice key={item.id} diceId={item.id} clicked={item.clicked} clickItem={clickItem} value={item.value} />
  })

  return (
    <div className="app">
      <main>
        {isWinner && <Confetti />}
        <h1 className='heading'>Tenzies</h1>
        <p className='paragraph'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-grid'>
          {dice}
        </div>
        {isWinner ? <button onClick={reset}>Reset Game</button> : <button onClick={rollDice}>Roll</button>}
      </main>
    </div>
  );
}

export default App;
