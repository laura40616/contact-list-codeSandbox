import React from 'react'

import ContactPage from './pages/ContactPage'
import { GlobalProvider } from './context/GlobalState'

import './styles.css'

const App = () => {
  return (
    <GlobalProvider>
      <div className='App'>
        <h1>Contact List</h1>
        <p>api endpoint: https://jsonplaceholder.typicode.com/users</p>
        <ContactPage />
      </div>
    </GlobalProvider>
  )
}

export default App
