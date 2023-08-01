import { useContext } from 'react'

import FirebaseContext from 'context/provider/firebase'

const useAuth = () => {
  return useContext(FirebaseContext)
}

export default useAuth