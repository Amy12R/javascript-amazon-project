export let cart;

loadFromStorage(); 

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')); // Because of 'export', now this variable can be used outside of cart.js

  // Technique: deduplicating/normalizing the data

  if (!cart) {
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      } /* Saving the data we need in the checkout.js file*/,
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1' 
    });
  }

  saveToStorage();
}

/* 
Steps
1. Create a new array
2. Loop through the cart
3. Add each product to the new array, except for this productId
*/

export function removeFromCart(productId) {  
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; 

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  }); // This will give us the cartItem that matches the productId and save it in the matchingItem variable

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
} 
/* When we update a delivery option, we need to know the product that we want to update as well as the delivery option that we chose.

Steps: 
1. Loop through the cart and find the product
2. Update the deliveryOptionId of the product
 */