import React from 'react'
import delve from 'delve'

const ContactInfo = ({ contact }) => {
  const name = delve(contact, 'name')
  const email = delve(contact, 'email')
  const street = delve(contact, 'address.street')
  const suite = delve(contact, 'address.suite')
  const city = delve(contact, 'address.city')
  const zipCode = delve(contact, 'address.zipcode')
  return (
    <>
      {name && (<>{name}<br /></>)}
      {email && (<>Email: {email}<br /></>)}
      <>Address: {street && (<>{street}, </>)} {suite && (<>{suite}, </>)} {city && (<>{city}, </>)} {zipCode && (<>{zipCode}</>)}</>
    </>
  )
}

export default ContactInfo
