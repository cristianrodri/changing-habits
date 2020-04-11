import React, { useContext } from 'react'
import '../sass/pages/home.scss'
import { GlobalContext } from '../context/GlobalState'

const Home = () => {
  const { signInWithFirebase } = useContext(GlobalContext)

  const handleSignIn = () => {
    signInWithFirebase()
  }
  return (
    <div className="home">
      <h2 className="home__title">
        ¿Quieres controlar cuánto tiempo llevas sin un mal hábito que tienes
        desarrollado?
      </h2>
      <h2 className="home__subtitle">
        Registrate y podrás calcular el tiempo de una manera muy fácil
      </h2>
      <button className="home__action button" onClick={handleSignIn}>
        <i className="fab fa-google"></i> Ingresa con tu cuenta de Google
      </button>
    </div>
  )
}

export default Home
