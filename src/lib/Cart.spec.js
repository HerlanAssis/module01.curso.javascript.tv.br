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
      expect(cart.getTotal()).toEqual(0);
    });

    it("should multiply quantity and price and receive the total amount", () => {
      const item = {
        quantity: 4,
        product,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(1800);
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

      expect(cart.getTotal()).toEqual(450);
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

      expect(cart.getTotal()).toEqual(500);
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
    expect(cart.getTotal()).toBeGreaterThan(0);
  });

  it("should reset the cart when chekout() is called", () => {
    cart.add({
      quantity: 2,
      product,
    });

    cart.checkout();

    expect(cart.getTotal()).toEqual(0);
  });
});
