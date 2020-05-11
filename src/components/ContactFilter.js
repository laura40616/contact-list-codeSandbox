import React, { useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'

const ContactFilter = () => {
  const { sortAscending, sortDescending, clearSort } = useContext(GlobalContext)
  return (
    <div className='btn-group container' role='group'>
      <div className='mr-3'>
        <button className='btn btn-primary' onClick={() => (sortAscending())}>Sort A-Z</button>
      </div>
      <div className='mr-3'>
        <button className='btn btn-primary' onClick={() => (sortDescending())}>Sort Z-A</button>
      </div>
      <div>
        <button className='btn btn-primary' onClick={() => (clearSort())}>Reset Sort</button>
      </div>
    </div>
  )
}

export default ContactFilter
