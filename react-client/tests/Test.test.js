/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from "react";
import { shallow } from "enzyme";
import Test from "@/pages/Test";

test("Test page should show text: test page", () => {
  const testEl = shallow(<Test />);
  expect(testEl.text()).toEqual("test page");
});
