import './App.css';
import { useEffect, useState } from 'react';
import Dice from './components/Dice';
import DiceProperties from './DiceProperties';
import Confetti from 'react-confetti'

function App() {

  const [diceProps, setDiceProps] = useState(DiceProperties);
  const [isWinner, setIsWinner] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [clickedState, setClickedState] = useState(false)

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

  useEffect(() => {
    function checkWinner() {
      for (let i = 0; i < diceProps.length; i++) {
        if (diceProps[i].value !== diceProps[0].value) {
          return setIsWinner(false)
        }
      }
      return setIsWinner(true)
    }
    return checkWinner()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedState])

  function clickItem(diceId) {
    setClickedState(prev => !prev)
    setDiceProps(prevDiceProps => {
      return prevDiceProps.map(item => {
        return item.id === diceId ? { ...item, clicked: !item.clicked } : item
      })
    })
  }

  function rollDice() {
    setDiceProps(prevDiceProps => {
      return prevDiceProps.map(item => {
        return item.clicked ? item : { ...item, value: Math.floor(6 * Math.random()) + 1 }
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
          value: Math.floor(6 * Math.random()) + 1
        }
      })
    })
  }

  const dice = diceProps.map((item) => {
    return <Dice key={item.id} diceId={item.id} clicked={item.clicked} clickItem={clickItem} value={item.value} />
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
