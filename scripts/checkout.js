import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js"; 
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'; // another syntax for import 
// import '../data/backend-practice.js';

Promise.all([
  loadProductsFetch(),
  new Promise ((resolve) => {
    loadCart(() => {
      resolve(); 
    }); 
  })

]).then((values) => {
  console.log(values); 
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => { 
    resolve('value1'); 
  }); 

}).then((value) => {
  console.log(value); // Output: value1
  return new Promise ((resolve) => {
    loadCart(() => {
      resolve(); 
    }); 
  }); // ✅ ALWAYS return a promise inside .then() if you want the next .then() to wait for it to complete.

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
}); // resolve is a function that is similar to done() function and lets us control when to go to the next step. We can give resolve a value. 
*/

/*
Promises
- a promise is a built-in class.
- similar to done() function.
- let us wait for some code to finish, before going to the next step 
- we can run multiple promises at the same time using Promise.all() and wait for all of them to finish. 


Why do we use promises?
- Multiple callbacks cause a lot of nesting.
- Promises let us flatten our code. So, it is recommended to use promises instead of callbacks. 
*/

// fetch is a better way to make http requests because it uses promises directly. 
// Using fetch, we can actually return a promise out of a function, and then keep attaching more steps to that promise.  

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary(); 
  });
}); // the callback function can be an anonymous function
*/




