import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("interactua con nuestro store", () => {
    const prevent = jest.fn();
    const reducer = jest.fn().mockReturnValue({
      finanzas: [{ desc: "hola", cant: 100 }],
    });
    const store = createStore(reducer);

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "hola" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "100" } });

    wrapper.find("form").simulate("submit", { preventDefault: prevent });

    wrapper.find("button").at(1).simulate("click");

    const [a, ...rest] = reducer.mock.calls;
    expect(rest).toEqual([
      [
        { finanzas: [{ desc: "hola", cant: 100 }] },
        { type: "AGREGAR", payload: { cant: 200, desc: "lele" } },
      ],
      [
        { finanzas: [{ desc: "blabla", cant: 150 }] },
        { type: "ELIMINAR", index: 0 },
      ],
    ]);
  });
});