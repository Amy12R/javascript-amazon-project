import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js'; 
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; // Named export - with curly brackets
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // Default export
import {deliveryOptions} from '../data/deliveryOptions.js';

hello(); 

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMM D'));   


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option; 
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays, 
    'days'
  );
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
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
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
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
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset; // Using shorthand property
    updateDeliveryOption(productId, deliveryOptionId);
  });
});

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
*/
