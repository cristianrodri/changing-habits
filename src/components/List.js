import React, { useEffect, useContext, useState } from 'react'
import '../sass/components/list.scss'
import Item from './Item'
import Loading from './Loading'
import { GlobalContext } from '../context/GlobalState'

const List = () => {
  const { habits, getHabits, isDeleting } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getHabits().then((res) => {
      setIsLoading(false)
    })
    // eslint-disable-next-line
  }, [])

  if (isLoading) return <Loading />

  if (!habits.length) return <p className="no-data">There's no habits</p>

  return (
    <>
      {isDeleting && <p className="deleting">Eliminando...</p>}
      <ul className="list">
        {habits.map((habit) => (
          <Item
            key={habit.uid}
            id={habit.uid}
            habit={habit.habit}
            date={habit.created}
          />
        ))}
      </ul>
    </>
  )
}

export default List
