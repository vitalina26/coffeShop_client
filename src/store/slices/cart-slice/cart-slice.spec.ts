/* eslint-disable @typescript-eslint/no-empty-function */
import cartSlice, { initialState,addToCart,incrementQuantity,decrementQuantity } from "./cart-slice";

const fakeLocalStorage = (function () {
  return {
      getItem: function () {},
      setItem: function () {},
      removeItem: function () {},
      clear: function () {}
    };
  })();
  describe("tests for cartSlice", () => {
      const testData = {
          coffe_id: '2cbbaa08-384c-43e2-9611-81bca0f45796',
          price: 450
      };
      const res = {
          items: [{ coffe_id: '2cbbaa08-384c-43e2-9611-81bca0f45796',quantity: 1}],
          counter: 450
      }
      
      beforeAll(() => {
          Object.defineProperty(window, 'localStorage', {
            value: fakeLocalStorage,
          });
        });
      
    test("initialize slice with initialValue", () => {
      const cartSliceInit = cartSlice(initialState, { type: "unknown" });
      expect(cartSliceInit).toBe(initialState);
    });

    test("addToCartReducer", () => {
    const afterReducerOperation = cartSlice(
        initialState,
        addToCart(testData)
      );
      
      expect(afterReducerOperation).toStrictEqual(res);
    });
    test("incrementReducer", () => {
      const testData = {
          coffe_id: '2cbbaa08-384c-43e2-9611-81bca0f45796',
          price: 450
      };

      const afterReducerOperation = cartSlice(
        res,
        incrementQuantity(testData)
      );

      expect(afterReducerOperation).toStrictEqual({
          items: [{ coffe_id: '2cbbaa08-384c-43e2-9611-81bca0f45796',quantity: 2}],
          counter: 900
      });
    });
    test("decrementReducer", () => {
      const testData = {
          coffe_id: '2cbbaa08-384c-43e2-9611-81bca0f45796',
          price: 450
      };
      const initialForDecrement = {
          items: [{ coffe_id: '2cbbaa08-384c-43e2-9611-81bca0f45796',quantity: 1}],
          counter: 450
      }
      const afterReducerOperation = cartSlice(
        res,
        decrementQuantity(initialForDecrement)
      );

      expect(afterReducerOperation).toStrictEqual({
          items: [{ coffe_id: '2cbbaa08-384c-43e2-9611-81bca0f45796',quantity: 1}],
          counter: 450
      });
  });
});