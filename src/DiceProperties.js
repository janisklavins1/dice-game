const DiceProperties = []
for (let i = 0; i < 10; i++){
  DiceProperties.push({
    id: i+1,
    value: Math.ceil(6 * Math.random()),
    checked: false
  })
}

export default DiceProperties