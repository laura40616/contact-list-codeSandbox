export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload.id),
        searchResult: state.searchResult.length ? state.searchResult.filter(contact => contact.id !== action.payload.id) : []

      }
    case 'ADD_CONTACTS':
      return {
        ...state,
        contacts: [...action.payload]
      }
    case 'SORT_ASCENDING':
      return {
        ...state,
        contacts: state.contacts.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1)
      }
    case 'SORT_DESCENDING':
      return {
        ...state,
        contacts: state.contacts.sort((a, b) => {
          const x = a.name.toUpperCase()
          const y = b.name.toUpperCase()
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
    case 'CLEAR_SORT':
      return {
        ...state,
        contacts: state.contacts.sort((a, b) => {
          const x = a.id
          const y = b.id
          return x < y ? -1 : x > y ? 1 : 0
        })
      }

    case 'SEARCH_BY_NAME':
      return {
        ...state,
        searchResult: state.contacts.filter(contact => contact.name.toUpperCase() === action.payload.toUpperCase()) || state.contacts
      }

    case 'CLEAR_SEARCH_RESULT':
      return {
        ...state,
        searchResult: []
      }
    default: return state
  }
}
