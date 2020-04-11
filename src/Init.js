import React, { useEffect, useContext } from 'react'
import Home from './pages/Home'
import HabitsController from './pages/HabitsController'
import Loading from './components/Loading'
import { GlobalContext } from './context/GlobalState'

const Init = () => {
  const { init, isLogged, isLoading, error } = useContext(GlobalContext)

  useEffect(() => {
    init()
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      {isLogged ? <HabitsController /> : <Home />}
      {error && <p>{error}</p> }
    </>
  )
}

export default Init
