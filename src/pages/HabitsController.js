import React from 'react'
import '../sass/pages/habits-controller.scss'
import Form from '../components/Form'
import List from '../components/List'

const HabitsController = () => {

  return (
    <div className="habits-controller">
      <Form />
      <List />
    </div>
  )
}

export default HabitsController
