// eslint-disable-next-line node/no-unpublished-import
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow } from "enzyme";
import React from "react";

import Sidebar from "../components/Sidebar";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders correctly", () => {
    shallow(<Sidebar />);
  });

  it("includes .Sidebar-title", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".Sidebar-title").length).toEqual(1);
  });

  it("includes .Sidebar-selectLabel", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".Sidebar-selectLabel").length).toEqual(3);
  });

  it("includes .Sidebar-button", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".Sidebar-button").length).toEqual(1);
  });

  it("includes .Sidebar-input", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".Sidebar-input").length).toEqual(1);
  });

  it("includes .Sidebar-select", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".Sidebar-select").length).toEqual(2);
  });
});
