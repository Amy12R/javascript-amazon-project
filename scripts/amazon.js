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
3. Make it interactive
*/

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
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
  `;
});

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;