import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import '../sass/components/modal.scss'

const Modal = ({ open, title, handleCancel, handleConfirm }) => {

  const closeModal = e => {
    if (e.key === 'Escape') handleCancel()
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModal)

    return () => document.removeEventListener('keydown', closeModal)
    // eslint-disable-next-line
  }, [])

  const handleConfirmModal = () => {
    handleConfirm()
  }

  const handleCancelModal = () => {
    handleCancel()
  }

  if (!open) return null

  return (
    <div className="modal">
      <div className="modal__inner">
        <h2 className="modal__title">{title}</h2>
        <div className="modal__container-button">
          <button className="modal__button cancel" onClick={handleCancelModal}>No</button>
          <button className="modal__button confirm" onClick={handleConfirmModal}>Sí</button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
}

export default Modal
