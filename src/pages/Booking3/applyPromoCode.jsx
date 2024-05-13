// applyPromoCode.jsx
const applyPromoCode = (sum, promoCode) => {
  const discounts = {
    SAVE10: 0.1, // 10% discount
    SAVE20: 0.2 // 20% discount
  };
  const discount = discounts[promoCode];
  return discount ? sum * (1 - discount) : sum;
};

export default applyPromoCode;
