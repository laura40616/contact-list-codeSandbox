import React from 'react'

import ContactSearch from '../components/ContactSearch'
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter'

import useGetContacts from '../hooks/useGetContacts'

const ContactPage = () => {
  const { loading, error } = useGetContacts()
  return (
    !loading && !error
      ? (
        <>
          <ContactSearch />
          <ContactFilter />
          <ContactList />
        </>
      )
      : (loading && !error) ? (<p>Loading...</p>) : (<p>{error}</p>)
  )
}

export default ContactPage
