import React, { useContext, useState } from 'react'
import '../sass/components/header.scss'
import { GlobalContext } from '../context/GlobalState'
import Modal from './Modal'

const Header = () => {
  const { isLogged, signOutWithFirebase, deleteUser } = useContext(GlobalContext)
  const [open, setOpen] = useState(false)

  const handleSignOut = () => {
    signOutWithFirebase()
  }

  const handleDeleteUser = () => {
    setOpen(true)
  }

  const handleConfirm = () => {
    deleteUser()
      .then(res => {
        setOpen(false)
        console.log('User deleted')
        signOutWithFirebase()
      })
  }

  const handleCancel = () => {
    setOpen(false)
  }
  

  return (
    <>
      <header className="header">
        <p className="header__title">Changing Habits</p>
        {isLogged && (
          <div className="header__options">
            <button className="header__delete" onClick={handleDeleteUser}>Delete User</button>
            <button className="header__logout button" onClick={handleSignOut}>Logout</button>
          </div>
        )}
      </header>
      {open && (
        <Modal
          open={open}
          title="¿Estás seguro de querer elimiar tu cuenta?"
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      )}
    </>
  )
}

export default Header
