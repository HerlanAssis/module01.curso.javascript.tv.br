import find from "lodash/find";
import remove from "lodash/remove";
import Money from "./money";
import { calculateDiscount } from "./discount.utils";

export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce((accumulator, currentItem) => {
      const { product, quantity } = currentItem;
      const amount = Money({ amount: product.price * quantity });

      const discount = calculateDiscount(amount, currentItem);

      return accumulator.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  add(item) {
    const itemToRemove = find(this.items, { product: item.product });

    if (itemToRemove) {
      remove(this.items, itemToRemove);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  summary() {
    const total = this.getTotal();
    const formatted = total.toFormat("$0,0.00");
    const items = this.items;

    return {
      total,
      formatted,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}

const cart = new Cart();

const product = {
  title: "",
  price: "",
};

const item = {
  quantity: 2,
  product,
};

cart.add(item);
cart.remove(product);
cart.getTotal();
cart.summary();
cart.checkout();
