/* Main Idea of JavaScript 
1. Save the data
data = information
(information about the products on the amazon webpage): the product image, the product name, rating and price
- To save the data, we are going to create an array that will contain all the products. And each product will be represented by an object. 
Object = group multiple values together
Array = a list of values; this time, it is a list of product
- To save the data in JavaScript means: to create something in JavaScript that closely mathes the data on the page
Data structure = organizes data
- To create a data structure in JavaScript, we use a combination of objects and arrays.
2. Generate the HTML 
- To generate the HTML manually, we loop through the array where we saved the data into, and display the HTML we generated on the console 
- Then, we combine this HTML together and save it in a variable
- And, we put it on the webpage (using the DOM)
3. Make it interactive:
- To make it interactive, we add event listener to all buttons using queryselectorAll and forEach to loop.
- Then, with each click add a product to the cart array using .push().
Steps:
1. Check if the product is already in the cart. By looping through the cart array using forEach we can check that.
2. If it is in the cart, increase the quantity.
3. If it is not in the cart, add it to the cart.
*/

import { cart, addToCart } from '../data/cart.js'; // Imports can import multiple things from a file. 
/*
Import have another syntax: 'import * as'
import * as cartModule from '../data/cart.js';

cartModule.cart
cartModule.addToCart('id'); We can access each import as a property or a method. 
*/
import {products} from '../data/products.js'; 
import { formatCurrency } from './utils/money.js'; 

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div> 

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()} 

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}"> 
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();    
  });
}); 

/* How do you know which product to add?
Data Attribute: is just another HTML attribute.
** The data- attribute (also called data attributes) in HTML allows you to store custom data on HTML elements. These attributes don’t affect how the element looks or behaves, but they can hold information that you can access using JavaScript.

Syntax for a Data Attribute
Example:
name: data-product-name, The name have to start with "data-" then give it any name. And the case used is called kebab-case.
value: ${product.name} 

syntax: data-key="value"
1) data-: The prefix that tells the browser this is a custom data attribute.
2) key: The name you give to the data (e.g., data-user, data-id, data-category).
3) value: The actual data you store (e.g., 123, admin, electronics)
*/

/*
The data set property basically gives us all the data attributes that are attached to the html element. This time, the add-to-cart button.
 */

/* Create a Module
1. Create a file
2. Don't load the file with <script>
By doing this, any variables we create inside the file, will be contained inside the file.

How to Get a Variable Out of a File or a Module?
1. Add type="module" attribute
2. Export
3. Import - we have to put all imports at the top of the file.
- In order for modules to work, we need to use Live Server. 

Benefits of Modules
1. It helps us avoid naming conflicts.
2. We actually don't have to worry about order of files.
Modules are a better way to organize our code.
*/
