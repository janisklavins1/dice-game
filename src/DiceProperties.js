const rollDice = () => {
    return Math.floor(6 * Math.random()) + 1
}

const DiceProperties =  [
    {
        id: 1,
        value: rollDice(),
        clicked: false
    },
    {
        id: 2,
        value: rollDice(),
        clicked: false
    },
    {
        id: 3,
        value: rollDice(),
        clicked: false
    },   
    {
        id: 4,
        value: rollDice(),
        clicked: false
    },   
    {
        id: 5,
        value: rollDice(),
        clicked: false
    },   
    {
        id: 6,
        value: rollDice(),
        clicked: false
    },
    {
        id: 7,
        value: rollDice(),
        clicked: false
    },   
    {
        id: 8,
        value: rollDice(),
        clicked: false
    },   
    {
        id: 9,
        value: rollDice(),
        clicked: false
    },   
    {
        id: 10,
        value: rollDice(),
        clicked: false
    },
]

export default DiceProperties