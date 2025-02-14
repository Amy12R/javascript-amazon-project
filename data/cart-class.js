class Cart {
  cartItems; // A property without a has infront, is called a public property. 
  #localStorageKey; // To make the property 'localStorageKey' private, we are just gonna add a number sign or a hash infront. And also whenever we access this property inside the class, we are gonna add the hash infront.   

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey; // We can replace the 'objectName' with 'this'. 'this' points to the object that we generate. 
    this.#loadFromStorage();
  } // Each object that we create is going to run the constructor, so we only need to setup the code for one object.

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); // "this" lets an object access its own properties

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
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  } // Shortcut for: saveToStorage: function() {

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
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

// A naming convention is to use PascalCase for things that generate objects
// In PascalCase, we start every word with a capital

const cart = new Cart('cart-oop'); 
const businessCart = new Cart('cart-business'); 
// Each object we generate from a class is called an instance. 

console.log(cart);
console.log(businessCart); 
console.log(businessCart instanceof Cart); // We can also check if an object is an instance of a class using the code: objectName instanceof ClassName;

/* 
Class = object generator
= Classes are cleaner and have more features that using a function. 

Benefits of Classes
A class have properties and methods. 
A class looks like the object that it generates. 
Classes have extra features for Object-Oriented Programming.
- Constructor = lets as run some setup code; it lets us put a setup code inside the class

More details about constructor: 
1. The method has to be named "constructor".
2. We also should not return anything from a constructor.

Classes let us make a property or a method private, i.e., it can only be accessed inside the class.  
*/
