function Cart(localStorageKey) {
  // A naming convention is to use PascalCase for things that generate objects
  // In PascalCase, we start every word with a capital
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    }, // Shortcut for: saveToStorage: function() {

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  }; 

  return cart; 
} // Every time we run this function, it will generate a new cart object. 

const cart = Cart('cart-oop'); 
const businessCart = Cart('cart-business');  

cart.loadFromStorage(); 

businessCart.loadFromStorage(); 

console.log(cart);
console.log(businessCart); 

/* 
Procedural Programming:
Procedure = a set of step-by-step instructions
          = a function / organizing code into  separate functions 

Object-Oriented Programming (OOP):
= organize our code into objects
= tries to represent the real world 
= using OOP, we can easily create multiple objects 

How do we create 2 separate carts in our code?  
= We can do so by copy-pasting.
= But to make out code cleaner, we will use a function to create multiple objects.
*/
