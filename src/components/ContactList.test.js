/* global it, describe */
import React from "react";
import { GlobalContext } from "../context/GlobalState";
import ContactList from "./ContactList";

import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
const chai = require("chai");
const chaiJestMock = require("chai-jest-mocks");
chai.use(chaiJestMock);

describe("<ContactList />", () => {
  const contacts = [
    {
      id: 1,
      name: "Test Name",
      email: "test@test.com",
      address: {
        street: "123 W Main",
        suite: "11",
        city: "City",
        zip: "55555"
      }
    },
    {
      id: 2,
      name: "Another Test Name",
      email: "another@test.com",
      address: {
        street: "456 W Test",
        suite: "22",
        city: "City",
        zip: "11111"
      }
    }
  ];
  it("renders the contact list component", () => {
    const component = mount(
      <GlobalContext.Provider
        value={{ contacts, searchResult: [], removeContact: jest.fn() }}
      >
        <ContactList />
      </GlobalContext.Provider>
    );
    expect(component.find("li").length).to.eql(2);
  });

  it("will display search results", () => {
    const searchResult = [
      {
        id: 3,
        name: "Search Result",
        email: "search@result.com",
        address: {
          street: "456 W Test",
          suite: "22",
          city: "City",
          zip: "33333"
        }
      }
    ];
    const component = mount(
      <GlobalContext.Provider
        value={{ contacts, searchResult, removeContact: jest.fn() }}
      >
        <ContactList />
      </GlobalContext.Provider>
    );
    expect(component.find("li").length).to.eql(1);
  });

  it("has a remove button", () => {
    const removeContact = jest.fn();
    const component = mount(
      <GlobalContext.Provider
        value={{ contacts, searchResult: [], removeContact }}
      >
        <ContactList />
      </GlobalContext.Provider>
    );
    const removeButton = component.find("button");
    removeButton.at(0).simulate("click");
    expect(removeContact).to.have.beenCalledWith(contacts[0]);
  });
});
