import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Statistic from './Statistic.jsx'
import Statistics from './Statistics.jsx'
import Button from './Button.jsx'
import Header from './Header.jsx'
const App = () => {
  // save clicks of each button to own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () =>
    setClicks({...clicks, good: clicks.good + 1})

  const handleNeutralClick = () =>
    setClicks({...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () =>
    setClicks({...clicks, bad: clicks.bad + 1})


  return (
    <div>
      <Header name="Customer feedback" />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header name="Statistics" />
      <Statistics clicks={clicks} />
    </div>
  )
}
export default App
