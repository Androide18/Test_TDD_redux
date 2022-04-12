import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Finanzas from "./Finanzas";

configure({ adapter: new Adapter() });

describe("Finanzas", () => {
  it("llama a eliminarFinanza onClick", () => {
    const finanzas = [
      { desc: "Pago de luz", cant: "100" },
      { desc: "Pago de agua", cant: "200" },
      { desc: "Pago de telefono", cant: "300" },
    ];
    const eliminarFinanza = jest.fn();
    const wrapper = shallow(
      <Finanzas finanzas={finanzas} eliminarFinanza={eliminarFinanza} />
    );

    wrapper.find("button").at(0).simulate("click");
    expect(eliminarFinanza.mock.calls).toEqual([[0]]);

    const resultado1 = wrapper.text().includes("Pago de luz");
    const resultado2 = wrapper.text().includes("Pago de agua");

    expect(resultado1).toEqual(true);
    expect(resultado2).toEqual(true);
  });
});
