export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
} // checkout.js and cart.js will share this function 

export default formatCurrency; 