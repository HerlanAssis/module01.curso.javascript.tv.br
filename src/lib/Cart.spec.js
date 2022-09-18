import Cart from "./Cart";

describe("Cart", () => {
  let cart;
  let product;
  let product2;

  beforeEach(() => {
    cart = new Cart();
    product = {
      title: "Arroz",
      price: 450,
    };
    product2 = {
      title: "Feijão",
      price: 500,
    };
  });

  describe("getTotal()", () => {
    it("should return 0 when getTotal() is executed in a newly created instance", () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it("should multiply quantity and price and receive the total amount", () => {
      const item = {
        quantity: 4,
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(1800);
    });

    it("should ensure no more than on product exists at a time", () => {
      cart.add({
        quantity: 2,
        product,
      });

      cart.add({
        quantity: 1,
        product,
      });

      expect(cart.getTotal().getAmount()).toEqual(450);
    });

    it("shold update total when a product gets included and then removed", () => {
      cart.add({
        quantity: 2,
        product,
      });

      cart.add({
        quantity: 1,
        product: product2,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(500);
    });
  });

  describe("Checkout()", () => {
    it("should return an object with the total and the list of items", () => {
      cart.add({
        quantity: 2,
        product,
      });

      cart.add({
        quantity: 1,
        product: product2,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it("should return an object with the total and the list of items when summary is called()", () => {
      cart.add({
        quantity: 2,
        product,
      });

      cart.add({
        quantity: 1,
        product: product2,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it("should include formatted amount in the summary", () => {
      cart.add({
        quantity: 3,
        product,
      });

      cart.add({
        quantity: 1,
        product: product2,
      });

      expect(cart.summary().formatted).toEqual("R$18.50");
    });

    it("should reset the cart when chekout() is called", () => {
      cart.add({
        quantity: 2,
        product,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe("special conditions", () => {
    it("should apply discount quantity when above minimum is passed", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      const item = {
        quantity: 4,
        condition,
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(1260);
    });

    it("should not apply discount quantity when is below or equals minimum", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      const item = {
        quantity: 2,
        condition,
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(900);
    });

    it("should apply quantity discount for even quantities", () => {
      const condition = {
        quantity: 2,
      };

      const item = {
        quantity: 4,
        condition,
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(900);
    });

    it("should not apply quantity discount for even quantities when condition is not met", () => {
      const condition = {
        quantity: 2,
      };

      const item = {
        quantity: 1,
        condition,
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(450);
    });

    it("should apply quantity discount for odd quantities", () => {
      const condition = {
        quantity: 2,
      };

      const item = {
        quantity: 5,
        condition,
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(1350);
    });

    it("should receive two or more conditions and determine/apply the best discount. First Case.", () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      const item = {
        quantity: 5,
        condition: [condition1, condition2],
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(1350);
    });

    it("should receive two or more conditions and determine/apply the best discount. Second Case.", () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      const item = {
        quantity: 5,
        condition: [condition1, condition2],
        product,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(450);
    });
  });
});
