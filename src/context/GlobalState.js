import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = { contacts: [], searchResult: [] }

export const GlobalContext = createContext(initialState)
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  function removeContact (id) {
    dispatch({
      type: 'REMOVE_CONTACT',
      payload: id
    })
  }

  function addContacts (contacts) {
    dispatch({
      type: 'ADD_CONTACTS',
      payload: contacts
    })
  }

  function sortAscending () {
    dispatch({
      type: 'SORT_ASCENDING'
    })
  }

  function sortDescending () {
    dispatch({
      type: 'SORT_DESCENDING'
    })
  }

  function clearSort () {
    dispatch({
      type: 'CLEAR_SORT'
    })
  }

  function searchByName (name) {
    dispatch({
      type: 'SEARCH_BY_NAME',
      payload: name
    })
  }

  function clearSearchResult () {
    dispatch({
      type: 'CLEAR_SEARCH_RESULT'
    })
  }

  return (
    <GlobalContext.Provider value={{
      contacts: state.contacts,
      searchResult: state.searchResult,
      removeContact,
      addContacts,
      sortAscending,
      sortDescending,
      clearSort,
      searchByName,
      clearSearchResult
    }}
    >
      {children}
    </GlobalContext.Provider>)
}
