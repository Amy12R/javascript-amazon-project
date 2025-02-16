import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js'; 
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; // Named export - with curly brackets
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // Default export
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js'; 

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()} 
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  /* Steps
  1. Loop through deliveryOptions 
  2. For each option, generate some HTML
  */
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 
        'days'
      );

      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `     
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    }); 

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      
      container.remove();

      renderPaymentSummary(); 
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset; // Using shorthand property
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // A function can call/ re-run itself. And this feature is called recursion.
      renderPaymentSummary(); // Regenerates the html for the payment summary
    });
  });
}
 
/*
External library = code that is outside of our project. And we can load this code using a script tag.
Generally, we load external libraries first. 
Why we use external libraries?
- let us share code
- save time
- avoid duplicating work


To get the dates (the delivery options):
1. Get today's date
2. DO calculations (Add 7 days,...)
3. Display the date in easy-to-read format
Use DayJS - an external library

External libraries usually have a documentation page that shows us how to use the library.  

Best Practice in JS
When we need something complicated,
- Try to find an external library first before writing the code ourselves.

To use modules together with external libraries, we use a special version of the library called an ESM Version. 
- ESM stands for 'EcmaScript Module'.
EcmaScript = JavaScript
So, ESM Version is a version that works with JavaScript Modules. 

Default Export
- another way of exporting
- we can use it when we only want to export 1 thing from a file
- Each file can only have 1 default export 

Normalizing the Data related to delivery:
deliveryOptions = [{
  id: '1',
  deliveryTime: '7 days',
  deliveryPrice: 0
}, {
  id: '2',
  deliveryTime: '3 days',
  deliveryPrice: 499
}, {
  id: '3',
  deliveryTime: '1 day'
  deliveryPrice: 999
}]

cart = [{
  productId: 'e436...'
  quantity: 2
  deliveryOptionId: '2'
}]

To make the delivery options interactive, 
1. Update deliveryOptionId in the cart.
2. Update the page.

Steps:
1. Create a function for updating the delivery option in the cart.

MVC = Model- View - Controller
- The technique we used to update the data and regenerate all the HTML 
MVC: splits our code into 3 parts
1. Model = saves and manages the data
2. View = takes the data and displays it on the page
3. Controller = runs some code when we interact with the page

How MVC work: 
First, we use the model to generate the view. Then, when we interact with the view, it will run the controller. Then, the controller will update the model. Then, we use the updated model to regenerate the view.

MVC = makes sure the page always matches the data
MVC is known as a design pattern. Many JavaScript frameworks are based on MVC.
*/
