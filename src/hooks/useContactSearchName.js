import { useState } from 'react'

const useContactSearchName = () => {
  const [contactSearchName, setContactSearchName] = useState('')
  return { contactSearchName, setContactSearchName }
}

export default useContactSearchName
