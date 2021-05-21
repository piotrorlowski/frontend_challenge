// eslint-disable-next-line node/no-unpublished-import
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow } from "enzyme";
import React from "react";

import Chart from "../components/Chart";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders correctly", () => {
    shallow(<Chart />);
  });

  it("includes .Chart", () => {
    const wrapper = shallow(<Chart />);
    expect(wrapper.find(".Chart").length).toEqual(1);
  });
});
