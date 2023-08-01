import { useEffect, useState } from 'react'

import app from 'config/firebase'

import { useProvideFirestore } from 'config/firebase/firestore'

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  // sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth'

// import {
//   // getDownloadURL,
//   getStorage,
//   // ref,
//   // uploadBytes
// } from 'firebase/storage'

// import { 
//   getFunctions,
//   // httpsCallable
// } from 'firebase/functions'

const auth = getAuth(app)

export const useProvideAuth = () => {
  const { createProfile, getProfile, user } = useProvideFirestore()
  
  const [credentials, setCredentials] = useState(null)
  const [loading, setLoading] = useState(true)

  const signUpWithEmailAndPassword = async (user, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, user.email, password)
      const credentials = result.user
      
      await createProfile(credentials.uid, user)

      // if (!credentials.emailVerified) {
      //   await sendEmailVerification(credentials)
      // }
    } catch (error) {
      console.error(error)
    }
  }

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      return error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const credentials = result.user

      const uid = credentials.uid
      const user = {
        'email': credentials.email,
        'name': credentials.displayName,
      }

      await createProfile(uid, user)

      return uid
    } catch (error) {
      return error
    }
  }

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCredentials(user)
      if (user) {
        getProfile(user.uid)
      }
      setLoading(false)
    })
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    credentials,
    loading,
    logout,
    resetPassword,
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmailAndPassword,
    user
  }
}