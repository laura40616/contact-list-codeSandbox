/* global fetch */
import { useState, useEffect, useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'

const useGetContacts = () => {
  const [loading, isLoading] = useState(true)
  const [error, setError] = useState('')
  const { addContacts } = useContext(GlobalContext)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await fetch('https://jsonplaceholder.typicode.com/users')
        if (result.status === 200) {
          const contactData = await result.json()
          addContacts(contactData)
          isLoading(false)
        } else {
          setError('An error occured retrieving the data')
          isLoading(false)
        }
      } catch (error) {
        setError('An error occured retrieving the data')
        isLoading(false)
      }
    }
    fetchContacts()
  }, [])
  return { loading, error }
}

export default useGetContacts
