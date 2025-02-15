import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    // productId => get the full product details
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button> 
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document.querySelector(".js-place-order").addEventListener("click", async () => {
    try {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        }, // headers gives the backend more information about our request.
        body: JSON.stringify({
          cart: cart,
        }), // We can't send an object directly. We need to convert it into a JSON string.
      }); // To create a post request, we will give fetch a second parameter which is an object.

      const order = await response.json();
      addOrder(order);
    } catch {
      console.log('Unexpected error. Try again later'); 
    }

    window.location.href = 'orders.html' // window.location is a special object provided by JavaScript. And it lets us control the URL.  
  }); // This time we need to send some data to the backend. (We need to send our cart). To send data in a request, we need to use a different type of request. Post = lets us send data to the backend.
} 

/* 
To calculate the items price, 
  Steps:
  1. Loop through the cart
  2. For each product, price*quantity
  3. Add everything together 
*/