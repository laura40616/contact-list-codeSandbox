/* global it, describe */
import React from "react";
import { GlobalContext } from "../context/GlobalState";
import { act } from "react-dom/test-utils";
import ContactPage from "./ContactPage";
import wait from "waait";

import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
const chai = require("chai");
const chaiJestMock = require("chai-jest-mocks");
chai.use(chaiJestMock);

jest.mock("../components/ContactFilter.js", () => () => (
  <div id="contactFilter">Contact Filter</div>
));
jest.mock("../components/ContactList.js", () => () => (
  <div id="contactList">Contact List</div>
));
jest.mock("../components/ContactSearch.js", () => () => (
  <div id="contactSearch">Contact Search</div>
));
describe("<ContactPage />", () => {
  let addContacts;
  beforeEach(() => {
    addContacts = jest.fn();
  });
  it("renders the contact page", async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve()
      })
    );
    let result;
    await act(async () => {
      result = mount(
        <GlobalContext.Provider value={{ addContacts }}>
          <ContactPage />
        </GlobalContext.Provider>
      );
      await wait(0);
      result.update();
    });
    const filterComp = result.find("#contactFilter");
    const listComp = result.find("#contactList");
    const searchComp = result.find("#contactSearch");
    expect(filterComp.text()).to.match(/Contact Filter/i);
    expect(listComp.text()).to.match(/Contact List/i);
    expect(searchComp.text()).to.match(/Contact Search/i);
    expect(addContacts).to.have.beenCalled();
  });

  it("displays error message if api returns a 404", async () => {
    let result;
    window.fetch = jest.fn(() =>
      Promise.resolve({
        status: 404,
        json: () => Promise.resolve()
      })
    );
    await act(async () => {
      result = mount(
        <GlobalContext.Provider value={{ addContacts }}>
          <ContactPage />
        </GlobalContext.Provider>
      );
      await wait(0);
      result.update();
    });

    const errorComp = result.find("p");
    expect(errorComp.text()).to.match(/An error occured retrieving the data/i);
    expect(addContacts).not.to.have.beenCalled();
  });

  it("displays error message if an error was thrown getting data", async () => {
    let result;
    window.fetch = jest.fn(() =>
      Promise.reject(new Error("You are a terrible person"))
    );
    await act(async () => {
      result = mount(
        <GlobalContext.Provider value={{ addContacts }}>
          <ContactPage />
        </GlobalContext.Provider>
      );
      await wait(0);
      result.update();
    });
    const errorComp = result.find("p");
    expect(errorComp.text()).to.match(/An error occured retrieving the data/i);
    expect(addContacts).not.to.have.beenCalled();
  });
});
