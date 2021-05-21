// eslint-disable-next-line node/no-unpublished-import
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount, shallow } from "enzyme";
import React from "react";

import App from "../App";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders correctly", () => {
    shallow(<App />);
  });

  it("runs setData correctly", () => {
    const setData = jest.fn();
    const wrapper = mount(<App onChange={setData} />);
    const handleDataUpdate = jest.spyOn(React, "useState");
    handleDataUpdate.mockImplementation((data) => [data, setData]);
    wrapper.simulate("change");
    expect(setData).toBeTruthy();
  });
});
