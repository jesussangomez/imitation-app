import { useState } from 'react'

import app from 'config/firebase'

import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  // getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  // updateDoc,
  where
} from 'firebase/firestore'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from 'firebase/storage'

const db = getFirestore(app)
const storage = getStorage(app)

export const useProvideFirestore = () => {
  const [user, setUser] = useState()
  const [users, setUsers] = useState()
  const [event, setEvent] = useState()
  const [questions, setQuestions] = useState()
  const [myQuestions, setMyQuestions] = useState()
  const [speakers, setSpeakers] = useState()
  const [speaker, setSpeaker] = useState()
  const [notifications, setNotifications] = useState()
  const [presentation, setPresentation] = useState()
  const [presentations, setPresentations] = useState()
  
  const createProfile = async (uid, user) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      user['createdAt'] = serverTimestamp()
      user['updatedAt'] = serverTimestamp()
      user['role'] = 'user'
      user['uid'] = uid
      await setDoc(docRef, user)
    }
  }

  const updateProfile = async (uid, data) => {
    const docRef = doc(db, 'users', uid)

    data['updatedAt'] = serverTimestamp()

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await updateDoc(docRef, data)
    }
  }

  const getProfile = async (uid) => {
    const docRef = doc(db, 'users', uid)
    onSnapshot(docRef, doc => {
      setUser(doc.data())
    })
  }

  const createQuestion = async (question) => {
    const questionRef = collection(db, 'questions')

    question['createdAt'] = serverTimestamp()
    question['updatedAt'] = serverTimestamp()

    const doc = await addDoc(questionRef, question)
    return doc.id
  }

  const deleteQuestion = async (id) => {
    await deleteDoc(doc(db, 'questions', id))
  }

  const getQuestions = () => {
    const questionsRef = collection(db, 'questions')

    onSnapshot(questionsRef, (querySnapshot) => {
      const questions = []
      querySnapshot.forEach((doc) => {
        const question = doc.data()
        question['id'] = doc.id
        questions.push(question)
      })
      setQuestions(questions)
    })
  }

  const getMyQuestions = (uid) => {
    const questionsRef = collection(db, 'questions')

    const q = query(questionsRef, where('uid', '==', uid))

    onSnapshot(q, (querySnapshot) => {
      const questions = []
      querySnapshot.forEach((doc) => {
        const question = doc.data()
        question['id'] = doc.id
        questions.push(question)
      })
      setMyQuestions(questions)
    })
  }

  const createSpeaker = async (speaker) => {
    const speakersRef = collection(db, 'speakers')

    speaker['createdAt'] = serverTimestamp()
    speaker['updatedAt'] = serverTimestamp()

    const docRef = doc(speakersRef)

    const file = speaker['file']
    if (file instanceof File) {
      const storageRef = ref(storage, `speakers/${docRef.id}`)
      const snap = await uploadBytes(storageRef, file)
      const imageUrl = await getDownloadURL(snap.ref)
      speaker['imageUrl'] = imageUrl
      delete speaker['file']
    }

    await setDoc(docRef, speaker)
  }

  const updateSpeaker = async (id, speaker) => {
    const docRef = doc(db, 'speakers', id)
    const docSnap = await getDoc(docRef)
    
    speaker['updatedAt'] = serverTimestamp()

    const file = speaker['file']
    if (file instanceof File) {
      const storageRef = ref(storage, `speakers/${id}`)
      const snap = await uploadBytes(storageRef, file)
      const imageUrl = await getDownloadURL(snap.ref)
      speaker['imageUrl'] = imageUrl
      delete speaker['file']
    }
    
    if (docSnap.exists()) {
      await updateDoc(docRef, speaker)
    }
  }

  const getSpeaker = (id) => {
    const docRef = doc(db, 'speakers', id)
    onSnapshot(docRef, (doc) => {
      setSpeaker(doc.data())
    })
  }

  const getSpeakers = () => {
    const speakersRef = collection(db, 'speakers')

    onSnapshot(speakersRef, (querySnapshot) => {
      const speakers = []
      querySnapshot.forEach((doc) => {
        const speaker = doc.data()
        speaker['id'] = doc.id
        speakers.push(speaker)
      })
      setSpeakers(speakers)
    })
  }

  const updateEventInfo = async (event) => {
    const docRef = doc(db, 'events', 'nomoney')

    event['updatedAt'] = serverTimestamp()

    const docSnap = await getDoc(docRef)

    if (event['question'] === '') {
      event['question'] = deleteField()
    }
    
    if (docSnap.exists()) {
      await updateDoc(docRef, event)
    } else {
      event['createdAt'] = serverTimestamp()
      await setDoc(docRef, event)
    }
  }

  const getEventInfo = () => {
    const docRef = doc(db, 'events', 'nomoney')
    onSnapshot(docRef, (doc) => {
      setEvent(doc.data())
    })
  }

  const getNotifications = () => {
    const notificationsRef = collection(db, 'notifications')

    onSnapshot(notificationsRef, (querySnapshot) => {
      const notifications = []
      querySnapshot.forEach((doc) => {
        const notification = doc.data()
        notification['id'] = doc.id
        notifications.push(notification)
      })
      const filtered = notifications.filter((event) => {
        const time = (new Date(event.date.seconds * 1000)).getTime()
        return time < Date.now()
      })
      filtered.sort((a, b) => b.date.seconds - a.date.seconds)
      setNotifications(filtered)
    })
  }

  const createPresentation = async (presentation) => {
    const presentationRef = collection(db, 'presentations')

    presentation['createdAt'] = serverTimestamp()
    presentation['updatedAt'] = serverTimestamp()

    const doc = await addDoc(presentationRef, presentation)
    return doc.id
  }

  const getPresentation = (id) => {
    const docRef = doc(db, 'presentations', id)
    onSnapshot(docRef, (doc) => {
      setPresentation(doc.data())
    })
  }

  const getPresentations = () => {
    const presentationsRef = collection(db, 'presentations')

    onSnapshot(presentationsRef, (querySnapshot) => {
      const presentations = []
      querySnapshot.forEach((doc) => {
        const presentation = doc.data()
        presentation['id'] = doc.id
        presentations.push(presentation)
      })
      presentations.sort((a, b) => a.startTime.seconds - b.startTime.seconds)
      setPresentations(presentations)
    })
  }

  const updatePresentation = async (id, presentation) => {
    const docRef = doc(db, 'presentations', id)
    const docSnap = await getDoc(docRef)
    
    presentation['updatedAt'] = serverTimestamp()
    
    if (docSnap.exists()) {
      await updateDoc(docRef, presentation)
    }
  }

  const getUsers = () => {
    const usersRef = collection(db, 'users')

    onSnapshot(usersRef, (querySnapshot) => {
      const users = []
      querySnapshot.forEach((doc) => {
        const user = doc.data()
        user['id'] = doc.id
        users.push(user)
      })
      setUsers(users)
    })
  }

  const trackCover = async (cover) => {
    const coverRef = collection(db, 'covers')

    cover['createdAt'] = serverTimestamp()
    cover['updatedAt'] = serverTimestamp()

    const doc = await addDoc(coverRef, cover)
    return doc.id
  }

  return {
    createPresentation,
    createProfile,
    createQuestion,
    createSpeaker,
    deleteQuestion,
    event,
    getEventInfo,
    getMyQuestions,
    getNotifications,
    getPresentation,
    getPresentations,
    getProfile,
    getQuestions,
    getSpeaker,
    getSpeakers,
    getUsers,
    myQuestions,
    notifications,
    presentation,
    presentations,
    questions,
    speaker,
    speakers,
    trackCover,
    updateEventInfo,
    updatePresentation,
    updateProfile,
    updateSpeaker,
    user,
    users,
  }
}