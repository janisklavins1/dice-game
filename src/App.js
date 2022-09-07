import './App.css';
import { useEffect, useState } from 'react';
import Dice from './components/Dice';
import DiceProperties from './DiceProperties';
import Confetti from 'react-confetti'

function App() {

  const [diceProps, setDiceProps] = useState(DiceProperties);
  const [isWinner, setIsWinner] = useState(false);

  console.log(isWinner)

  useEffect(() => {
    return checkWinner()
  }, [diceProps])

  function checkWinner() {
    console.log('checking winner')
    for (let i = 0; i < diceProps.length; i++) {
      console.log(diceProps[i].value,  diceProps[0].value)
      if (diceProps[i].value !== diceProps[0].value) {
        console.log('failed check')
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
        <button onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
