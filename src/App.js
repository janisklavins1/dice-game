import './App.css';
import { useEffect, useState } from 'react';
import Dice from './components/Dice';
import Confetti from 'react-confetti'
import DiceProperties from './DiceProperties';

/*
TODO
CSS dots on dice instead of numbers
Track number of rolls
Track time it took to win
Save best time to localstorage

*/

function App() {

  const [diceProps, setDiceProps] = useState(DiceProperties);
  const [isWinner, setIsWinner] = useState(false);

  ///Section for Confetti component
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth)
    }

    function watchHeight() {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener("resize", watchWidth)
    window.addEventListener("resize", watchHeight)

    return function () {
      window.removeEventListener("resize", watchWidth)
      window.removeEventListener("resize", watchHeight)
    }
  }, [])

  ///End section for Confetti component

  useEffect(() => {
    const firstItemValue = diceProps[0].value
    const allClicked = diceProps.every(item => item.clicked)
    const allEqual = diceProps.every(item => item.value === firstItemValue)
    if (allClicked && allEqual) {
      return setIsWinner(true)
    }
    return setIsWinner(false)
  }, [diceProps])

  function clickItem(diceId) {
    setDiceProps(prevDiceProps => {
      return prevDiceProps.map(item => {
        return item.id === diceId ? { ...item, clicked: !item.clicked } : item
      })
    })
  }

  function rollDice() {
    setDiceProps(prevDiceProps => {
      return prevDiceProps.map(item => {
        return item.clicked ? item : { ...item, value: Math.ceil(6 * Math.random()) }
      })
    })
  }

  function reset() {
    setIsWinner(false)
    setDiceProps(prevDiceProps => {
      return prevDiceProps.map(item => {
        return {
          ...item,
          clicked: false,
          value: Math.ceil(6 * Math.random())
        }
      })
    })
  }

  const dice = diceProps.map((item) => {
    return <Dice key={item.id} clicked={item.clicked} clickItem={() => clickItem(item.id)} value={item.value} />
  })

  return (
    <div className="app">
      <main>
        {isWinner && <Confetti width={windowWidth} height={windowHeight} />}
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
