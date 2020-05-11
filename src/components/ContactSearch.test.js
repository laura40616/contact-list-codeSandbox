/* global it, describe */
import React from "react";
import { GlobalContext } from "../context/GlobalState";
import ContactSearch from "./ContactSearch";

import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
const chai = require("chai");
const chaiJestMock = require("chai-jest-mocks");
chai.use(chaiJestMock);

describe("<ContactSearch />", () => {
  it("renders the contact search components", () => {
    const component = mount(<ContactSearch />);
    const input = component.find('input[name="searchContacts"]');
    const button = component.find("button");
    expect(input.length).to.eql(1);
    expect(button.length).to.eql(1);
  });
  it("will search by name from text entered in input box", () => {
    const clearSearchResult = jest.fn();
    const searchByName = jest.fn();
    const component = mount(
      <GlobalContext.Provider value={{ clearSearchResult, searchByName }}>
        <ContactSearch />
      </GlobalContext.Provider>
    );
    const inputBox = component.find("input");
    inputBox.simulate("change", { target: { value: "test name" } });
    expect(inputBox.instance().value).to.eql("test name");
    expect(searchByName).to.have.beenCalledWith("test name");
  });
  it("will clear the search name entered in input box", () => {
    const clearSearchResult = jest.fn();
    const searchByName = jest.fn();
    const component = mount(
      <GlobalContext.Provider value={{ clearSearchResult, searchByName }}>
        <ContactSearch />
      </GlobalContext.Provider>
    );
    const inputBox = component.find("input");
    const clearButton = component.find("button");
    inputBox.simulate("change", { target: { value: "test name" } });
    expect(inputBox.instance().value).to.eql("test name");
    clearButton.simulate("click");
    expect(clearSearchResult).to.have.beenCalled();
    expect(inputBox.instance().value).to.eql("");
  });
});
