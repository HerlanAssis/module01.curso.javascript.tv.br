import find from "lodash/find";
import remove from "lodash/remove";

export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.product.price * currentItem.quantity;
    }, 0);
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
    const items = this.items;

    return {
      total,
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
