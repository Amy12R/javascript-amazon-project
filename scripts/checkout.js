import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js"; 
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'; // another syntax for import 
// import '../data/backend-practice.js';

async function loadPage() {
  await loadProductsFetch(); // await lets us write asynchronous code like normal code

  const value = await new Promise((resolve) => {
    loadCart(() => {
      resolve('value3');
    });
  });

  console.log(value); 
  renderOrderSummary();
  renderPaymentSummary();
} // async makes a function return a promise.
loadPage();

/*
function loadPage() {
  return new Promise((resolve) => {
    console.log('load page');
    resolve();

  }).then(() => {
    return loadProductsFetch();

  });then(() => {
    return new promise((resolve) => {
      resolve('value2');
    });
  });
}
*/

/*
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
*/

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

/* 
fetch is a better way to make http requests because it uses promises directly. 
- Using fetch, we can actually return a promise out of a function, and then keep attaching more steps to that promise. 

Async Await
= even better way to handle asynchronous code
= async lets us use await
= await lets us wait for a promise to finish, before going to the next line.  
= we can only use await, when we're inside an async function, and the closest function has to be async.
= async await can only be used with promises. It can't be used with a callback. 

Best practice
= Use async await over promises and callbacks.
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary(); 
  });
}); // the callback function can be an anonymous function
*/




