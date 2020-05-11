/* global it, describe */
import React from "react";
import ContactInfo from "./ContactInfo";

import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
const chai = require("chai");
const chaiJestMock = require("chai-jest-mocks");
chai.use(chaiJestMock);

describe("<ContactInfo />", () => {
  let contact;
  beforeEach(() => {
    contact = {
      name: "Test",
      email: "test@test.com",
      address: {
        street: "123 W Main",
        suite: "222",
        city: "somewhere",
        zipcode: "55555"
      }
    };
  });
  it("renders the contact info", () => {
    const component = mount(<ContactInfo contact={contact} />);
    const componentText = component.text();
    expect(componentText).to.include("Test");
    expect(componentText).to.include("test@test.com");
    expect(componentText).to.include("123 W Main");
    expect(componentText).to.include("222");
    expect(componentText).to.include("somewhere");
    expect(componentText).to.include("55555");
  });

  it("does not display the email if it is missing", () => {
    delete contact.email;
    const component = mount(<ContactInfo contact={contact} />);
    const componentText = component.text();
    expect(componentText).to.include("Test");
    expect(componentText).not.to.include("test@test.com");
    expect(componentText).to.include("123 W Main");
    expect(componentText).to.include("222");
    expect(componentText).to.include("somewhere");
    expect(componentText).to.include("55555");
  });

  it("does not display the name if it is missing", () => {
    delete contact.name;
    const component = mount(<ContactInfo contact={contact} />);
    const componentText = component.text();
    expect(componentText).not.to.include("Test");
    expect(componentText).to.include("test@test.com");
    expect(componentText).to.include("123 W Main");
    expect(componentText).to.include("222");
    expect(componentText).to.include("somewhere");
    expect(componentText).to.include("55555");
  });

  it("does not display the street if it is missing", () => {
    delete contact.address.street;
    const component = mount(<ContactInfo contact={contact} />);
    const componentText = component.text();
    expect(componentText).to.include("Test");
    expect(componentText).to.include("test@test.com");
    expect(componentText).not.to.include("123 W Main");
    expect(componentText).to.include("222");
    expect(componentText).to.include("somewhere");
    expect(componentText).to.include("55555");
  });

  it("does not display the suite if it is missing", () => {
    delete contact.address.suite;
    const component = mount(<ContactInfo contact={contact} />);
    const componentText = component.text();
    expect(componentText).to.include("Test");
    expect(componentText).to.include("test@test.com");
    expect(componentText).to.include("123 W Main");
    expect(componentText).not.to.include("222");
    expect(componentText).to.include("somewhere");
    expect(componentText).to.include("55555");
  });

  it("does not display the city if it is missing", () => {
    delete contact.address.city;
    const component = mount(<ContactInfo contact={contact} />);
    const componentText = component.text();
    expect(componentText).to.include("Test");
    expect(componentText).to.include("test@test.com");
    expect(componentText).to.include("123 W Main");
    expect(componentText).to.include("222");
    expect(componentText).not.to.include("somewhere");
    expect(componentText).to.include("55555");
  });

  it("does not display the zip code if it is missing", () => {
    delete contact.address.zipcode;
    const component = mount(<ContactInfo contact={contact} />);
    const componentText = component.text();
    expect(componentText).to.include("Test");
    expect(componentText).to.include("test@test.com");
    expect(componentText).to.include("123 W Main");
    expect(componentText).to.include("222");
    expect(componentText).to.include("somewhere");
    expect(componentText).not.to.include("55555");
  });
});
