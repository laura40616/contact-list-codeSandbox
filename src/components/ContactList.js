import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

import ContactInfo from "./ContactInfo";

const ContactList = () => {
  const { contacts, searchResult, removeContact } = useContext(GlobalContext);
  const contactList = searchResult.length ? searchResult : contacts;
  const handleRemoveContact = contactId => {
    removeContact(contactId);
  };
  return (
    <div className="container mt-3">
      <ul className="list-group">
        {contactList.map(contact => (
          <li className="list-group-item" key={contact.id}>
            <div className="container">
              <div className="row text-left">
                <ContactInfo contact={contact} />
              </div>
              <div className="row justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleRemoveContact(contact)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
