import React, { useState } from 'react'

function Check() {
  const [state, setstate] = useState({
    name: 'ram',
    data: 'gopal',
    age: 22
  })
  const handler = () => {
    console.log('previous state', state)
    let myState = { _id: 'zl433', name: 'vish', data: 'chend', age: 22 }
    setstate(myState)
    console.log('new state', state)
  }
  console.log('render state', state)

  return (
    <div>
      <button onClick={handler}>click</button>
    </div>
  )
}

export default Check
