import firebase from 'firebase/app'
import { firebaseConfig } from '../../firebase-config'

const init = () => firebase.initializeApp(firebaseConfig)

init()