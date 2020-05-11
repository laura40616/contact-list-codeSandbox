/* global it, describe */
import AppReducer from "./AppReducer";

import { expect } from "chai";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
const chai = require("chai");
const chaiJestMock = require("chai-jest-mocks");
chai.use(chaiJestMock);

describe("AppReducer", () => {
  let state, contacts;

  beforeEach(() => {
    contacts = [
      {
        id: 1,
        name: "Test Name"
      },
      {
        id: 2,
        name: "Another Test Name"
      },
      {
        id: 3,
        name: "Yet Another Test Name"
      }
    ];
    state = { contacts, searchResult: [] };
  });
  it("returns default state", () => {
    const result = AppReducer(state, "something");
    expect(result).to.eql(state);
  });
  it("sorts contacts ascending", () => {
    const result = AppReducer(state, { type: "SORT_ASCENDING" });
    expect(result.contacts).to.eql([
      {
        id: 2,
        name: "Another Test Name"
      },
      {
        id: 1,
        name: "Test Name"
      },
      {
        id: 3,
        name: "Yet Another Test Name"
      }
    ]);
  });

  it("sorts contacts descending", () => {
    const result = AppReducer(state, { type: "SORT_DESCENDING" });
    expect(result.contacts).to.eql([
      {
        id: 3,
        name: "Yet Another Test Name"
      },
      {
        id: 1,
        name: "Test Name"
      },
      {
        id: 2,
        name: "Another Test Name"
      }
    ]);
  });
  it("clears sorting", () => {
    const result = AppReducer(state, { type: "CLEAR_SORT" });
    expect(result.contacts).to.eql(contacts);
  });
  it("removes a contact from contacts", () => {
    const result = AppReducer(state, {
      type: "REMOVE_CONTACT",
      payload: { id: 1 }
    });
    expect(result.contacts).to.eql([
      {
        id: 2,
        name: "Another Test Name"
      },
      {
        id: 3,
        name: "Yet Another Test Name"
      }
    ]);
    expect(result.searchResult).to.eql([]);
  });
  it("removes a contact from contacts and searchResult", () => {
    const newState = { contacts, searchResult: contacts };
    const result = AppReducer(newState, {
      type: "REMOVE_CONTACT",
      payload: { id: 2 }
    });
    expect(result.contacts).to.eql([
      {
        id: 1,
        name: "Test Name"
      },
      {
        id: 3,
        name: "Yet Another Test Name"
      }
    ]);
    expect(result.searchResult).to.eql([
      {
        id: 1,
        name: "Test Name"
      },
      {
        id: 3,
        name: "Yet Another Test Name"
      }
    ]);
  });
  it("adds contacts", () => {
    const newState = { contacts: [], searchResult: [] };
    const payload = [{ id: 6, name: "Six" }, { id: 7, name: "Seven" }];
    const result = AppReducer(newState, { type: "ADD_CONTACTS", payload });
    expect(result.contacts).to.eql(payload);
  });
  it("returns a contact by name", () => {
    const payload = "Another Test Name";
    const result = AppReducer(state, { type: "SEARCH_BY_NAME", payload });
    expect(result.contacts).to.eql(contacts);
    expect(result.searchResult).to.eql([contacts[1]]);
  });
  it("returns all contacts if the name is not found", () => {
    const payload = "Not found";
    const result = AppReducer(state, { type: "SEARCH_BY_NAME", payload });
    expect(result.contacts).to.eql(contacts);
    expect(result.searchResult).to.eql([]);
  });
  it("clears search result", () => {
    const searchResult = contacts[1];
    const newState = { contacts, searchResult };
    const result = AppReducer(newState, { type: "CLEAR_SEARCH_RESULT" });
    expect(result.contacts).to.eql(contacts);
    expect(result.searchResult).to.eql([]);
  });
});
