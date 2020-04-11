import React, { useContext, useState } from 'react'
import PropType from 'prop-types'
import moment from 'moment'
import 'moment/locale/es'
import { GlobalContext } from '../context/GlobalState'
import Modal from '../components/Modal'

const Item = ({ habit, date, id }) => {
  const { deleteHabit, getHabits, deletingHabitEnd } = useContext(GlobalContext)
  const [open, setOpen] = useState(false)

  const handleConfirm = async e => {

    try {
      setOpen(false)
      await deleteHabit(id)
      await getHabits()
      deletingHabitEnd()
    } catch (error) {
      console.log(error)
      setOpen(false)
    }

  }

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <>
      <li className="list__item">
        <span className="list__description">{`Empezaste a ${habit}`}</span>
        <span className="list__date" title={moment(date.toDate()).format('LLL')}>{moment(date.toDate(), 'YYYYMMDD').locale('es').fromNow()}</span>
        <span className="list__icon" onClick={openModal} data-id={id} title="Delete">&#128465;</span>
      </li>
      {/* with 'open && ...' modal component only will be mounted when delete button is clicked. If you use modal below each li tag directly, modal component will be mounted in every iteration of list */}
      {open && (
        <Modal 
          open={open}
          handleConfirm={handleConfirm}
          handleCancel={closeModal}
          title="¿Estás seguro de querer eliminar este hábito de tu registro?"
        />
      )}
    </>
  )
}

Item.propTypes = {
  habit: PropType.string.isRequired,
  date: PropType.object.isRequired
}

export default Item
