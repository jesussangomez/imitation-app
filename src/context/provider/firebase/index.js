import { createContext } from 'react'

import { useProvideAuth } from 'config/firebase/auth'
import { useProvideFirestore } from 'config/firebase/firestore'
import { useProvideMessaging } from 'config/firebase/messaging'

const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
  const auth = useProvideAuth()
  const firestore = useProvideFirestore()
  const messaging = useProvideMessaging()

  return (
    <FirebaseContext.Provider value={{ auth, firestore, messaging }}>
      { !auth.loading && children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContext