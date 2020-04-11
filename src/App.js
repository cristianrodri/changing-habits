import React from 'react'
import { GlobalProvider } from './context/GlobalState'
import Init from './Init'
import Header from './components/Header'
// import Modal from './components/Modal'
import './sass/components/app.scss'

const App = () => {
  return (
    <GlobalProvider>
      <div className="app">
        <Header />
        <Init />
        {/* <Modal /> */}
      </div>
    </GlobalProvider>
  )
}

export default App
