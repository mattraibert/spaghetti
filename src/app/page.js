'use client'
import React from 'react'
import {createStore} from "@/store/createStore"

let niceReducer = (state, action) => {
  if (action.type === 'INSERT_COIN') {
    return {...state, crankMoney: state.crankMoney + 1}
  }
  if (action.type === 'TURN_CRANK') {
    if (state.crankMoney >= 1) {
      return {...state, gumballs: state.gumballs - 1, bankMoney: state.bankMoney + 1, crankMoney: 0}
    }
  }
  return state
}
let initialState = {crankMoney: 0, gumballs: 100, bankMoney: 0}
let store = createStore(niceReducer, initialState)
store.subscribe(() => console.log("XXX", store.getState()))

export default function Home() {
  const [localState, setLocalState] = React.useState(store.getState())

  React.useEffect(() => {
    const handleStoreUpdate = () => {
      setLocalState(store.getState())
    }

    const unsubscribe = store.subscribe(handleStoreUpdate)

    return () => {
      unsubscribe()
    }
  }, [])

  let state = store.getState()
  console.log("YYY", state)
  return (
    <main>
      <div>
        <p>
          {state.gumballs} gumballs left
        </p>
        <p>
          {state.crankMoney} coins inserted
        </p>
        <p>
          {state.bankMoney} coins in bank
        </p>
        <button onClick={() => store.dispatch({type: 'INSERT_COIN'})}>
          Insert Coin
        </button>
        <button onClick={() => store.dispatch({type: 'TURN_CRANK'})}>
          Turn Crank
        </button>
        <button onClick={() => store.dispatch({type: 'REFILL'})}>
          Refill
        </button>
        <button onClick={() => store.dispatch({type: 'COLLECT_MONEY'})}>
          Collect Money
        </button>
      </div>
    </main>
  )
}
