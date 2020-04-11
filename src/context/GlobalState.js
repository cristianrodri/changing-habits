import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import firebase from 'firebase/app'
import '../firebase/config'
import 'firebase/auth'
import 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { signIn, signOut } from '../firebase/auth'

// Initial state
const initialState = {
  habits: [],
  isLoading: true,
  error: '',
  isLogged: false,
  isDeleting: false,
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const db = firebase.firestore()

  // check is logged with firebase
  const init = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'SIGNED_IN' })
      }
      dispatch({ type: 'ERROR' })
    })
  }

  const signInWithFirebase = () => {
    signIn()
      .then((user) => {
        if (user) dispatch({ type: 'SIGNED_IN' })
        else dispatch({ type: 'SIGN_IN_REJECTED' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const signOutWithFirebase = () => {
    signOut().then((res) => {
      dispatch({ type: 'SIGN_OUT' })
    })
  }

  const getHabits = async () => {
    // get data from firebase
    const docRef = db.collection('habits').doc(firebase.auth().currentUser.uid)

    return docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: 'GET_HABITS', payload: doc.data().allHabits })
        } else {
          dispatch({ type: 'GET_HABITS', payload: [] })
          console.log('No data found')
        }
      })
      .catch((err) => console.log(err))
  }

  const addHabit = async (habitValue) => {
    // add value data to database

    const docRef = db.collection('habits').doc(firebase.auth().currentUser.uid)

    return db.runTransaction((transaction) => {
      return transaction
        .get(docRef)
        .then((doc) => {
          const newData = {
            habit: habitValue,
            created: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
            uid: uuidv4(),
          }

          if (!doc.exists) {
            transaction.set(docRef, {
              allHabits: [newData],
            })
          } else {
            const data = doc.data().allHabits
            data.push(newData)
            transaction.update(docRef, { allHabits: data })
          }
        })
        .catch((err) => console.log(err))
    })
  }

  const deleteHabit = async (habitId) => {
    dispatch({ type: 'DELETING_HABIT', payload: true })

    // delete data from firebase
    const docRef = db.collection('habits').doc(firebase.auth().currentUser.uid)

    return db.runTransaction((transaction) => {
      return transaction
        .get(docRef)
        .then((doc) => {
          const getData = doc.data().allHabits

          const updatedData = getData.filter((data) => data.uid !== habitId)

          // If update data after filter has no data, delete docRef
          if (!updatedData.length) transaction.delete(docRef)
          else transaction.update(docRef, { allHabits: updatedData })
        })
        .catch((err) => console.log(err))
    })
  }

  const deletingHabitEnd = () => {
    dispatch({ type: 'DELETING_HABIT', payload: false })
  }

  const deleteUser = async () => {
    const user = firebase.auth().currentUser
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      const result = await firebase.auth().signInWithPopup(provider)

      await user.reauthenticateWithCredential(result.credential)

      // delete all habits of the user deleting by document. After this delete the user
      await db.collection('habits').doc(firebase.auth().currentUser.uid).delete()

      // delete user
      return user.delete()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        habits: state.habits,
        isLoading: state.isLoading,
        error: state.error,
        isLogged: state.isLogged,
        isDeleting: state.isDeleting,
        init,
        signInWithFirebase,
        signOutWithFirebase,
        getHabits,
        addHabit,
        deleteHabit,
        deletingHabitEnd,
        deleteUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
