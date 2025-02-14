import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js"; 
// import '../data/cart-class.js'; // another syntax for import 
// import '../data/backend-practice.js';

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary(); 
}); // the callback function can be an anonymous function


