import React, { useContext } from 'react'

import useContactSearchName from '../hooks/useContactSearchName'
import { GlobalContext } from '../context/GlobalState'

const ContactSearch = ({ contacts }) => {
  const { contactSearchName, setContactSearchName } = useContactSearchName()
  const { searchByName, clearSearchResult } = useContext(GlobalContext)
  const clearSearchName = () => {
    setContactSearchName('')
    clearSearchResult()
  }

  const onChangeSetSearchName = e => {
    e.preventDefault()
    const searchName = e.target.value
    setContactSearchName(searchName)
    searchByName(searchName)
  }

  return (
    <div className='input-group container mb-3'>
      {/* <div className='input-group'> */}
      <input
        type='text'
        id='searchContacts'
        name='searchContacts'
        className='form-control'
        placeholder='Search Contacts'
        value={contactSearchName}
        onChange={onChangeSetSearchName}
      />
      <div className='input-group-append'>
        <button className='btn btn-primary' id='clearButton' onClick={clearSearchName}>Clear</button>
      </div>
      {/* </div> */}
    </div>
  )
}

export default ContactSearch
