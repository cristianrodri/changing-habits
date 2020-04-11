import React, { useState, useContext } from 'react'
import '../sass/components/form.scss'
import { GlobalContext } from '../context/GlobalState'

const Form = () => {
  const [habitValue, setHabitValue] = useState('')
  const { addHabit, getHabits } = useContext(GlobalContext)
  const [isDisabled, setIsdisabled] = useState(false)

  const handleValue = e => {
    setHabitValue(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setHabitValue('')

    try {
      setIsdisabled(true)
      await addHabit(habitValue.trim())
      await getHabits()
      setIsdisabled(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Escape') setHabitValue('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">¿Qué mal hábito deseas reducir?</h2>
      <input
        type="text"
        className="form__input"
        value={habitValue}
        onChange={handleValue}
        onKeyDown={handleKeyPress}
        maxLength={50}
        required
      />
      <input
        type="submit"
        className="form__submit"
        disabled={isDisabled}
        value={isDisabled ? 'Añadiendo...' : 'Añadir'}
      />
    </form>
  )
}

export default Form
