import reducer, { agregar, eliminar } from "./finanzas";

describe("Finanzas Ducks", () => {
  describe("Action creators", () => {
    it("agregar", () => {
      const resultado = agregar(1);
      expect(resultado).toEqual({
        type: "AGREGAR",
        payload: 1,
      });
    });
    it("eliminar", () => {
      const resultado = eliminar(1);
      expect(resultado).toEqual({
        type: "ELIMINAR",
        index: 1,
      });
    });
  });

  describe("Reducer", () => {
    it("AGREGAR", () => {
      const resultado = reducer([1], {
        type: "AGREGAR",
        payload: 2,
      });
      expect(resultado).toEqual([1, 2]);
    });
    it("ELIMINAR", () => {
      const resultado = reducer([1, 2, 3], {
        type: "ELIMINAR",
        index: 0,
      });
      expect(resultado).toEqual([2, 3]);
    });
    it("default", () => {
      const resultado = reducer([1], {
        type: "NADA_EN_MI_REDUCER",
      });
      expect(resultado).toEqual([1]);
    });
  });
});
