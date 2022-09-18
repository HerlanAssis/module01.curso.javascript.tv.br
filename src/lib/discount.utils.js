import Money from "./money";

const calculatePercentageDiscount = (amount, { quantity, condition }) => {
  if (condition?.percentage && quantity > condition?.minimum) {
    return amount.percentage(condition.percentage);
  }

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, { condition, quantity }) => {
  const isEven = quantity % 2 === 0;

  if (condition?.quantity && quantity > condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }

  return Money({ amount: 0 });
};

const getMaxDiscount = (...discounts) => {
  return discounts.reduce((accumulator, currentItem) => {
    if (currentItem.getAmount() > accumulator.getAmount()) {
      return currentItem;
    }

    return accumulator;
  }, Money({ amount: 0 }));
};

const calculateDiscount = (amount, currentItem) => {
  const { condition, quantity } = currentItem;
  const list = Array.isArray(condition) ? condition : [condition];

  const discounts = list.flatMap((cond) => {
    return [
      calculatePercentageDiscount(amount, { quantity, condition: cond }),
      calculateQuantityDiscount(amount, { quantity, condition: cond }),
    ];
  });

  return getMaxDiscount(...discounts);
};

export { calculateDiscount };
