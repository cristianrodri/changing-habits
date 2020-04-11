import firebase from 'firebase/app'

const provider = new firebase.auth.GoogleAuthProvider()

const signIn = () => firebase.auth().signInWithRedirect(provider)

const signOut = () => firebase.auth().signOut()

export {
  signIn,
  signOut
}