import app from 'config/firebase'

import { useProvideFirestore } from 'config/firebase/firestore'

import { 
  getMessaging,
  getToken,
} from 'firebase/messaging'

const messaging = getMessaging(app)

export const useProvideMessaging = () => {
  const { updateProfile } = useProvideFirestore()

  // const [token, setToken] = useState()

  const getFCMToken = async (uid) => {
    try {
      // const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
      // console.log(messaging)
      const options =  { 
        // serviceWorkerRegistration: registration,
        vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_KEY_PAIR,
      }
      const token = await getToken(messaging, options)
      // setToken(token)
      updateProfile(uid, { 'token': token })
    } catch(error) {
      console.log(error)
    }
  }

  return {
    getFCMToken
  }
}