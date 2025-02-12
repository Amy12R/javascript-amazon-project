import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem'); // A mock only lasts for 1 test, that is why we had to remock setItem for this test too. 
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2); 
  });

  it('adds a new product to the cart ', () => {
    spyOn(localStorage, "setItem"); // We mock setItem first and then we call addToCart().
    // spyOn() has another useful feature. It records every time a method is used.

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    }); // we can make this fake version do anything we want.
    // We mock localStorage.getItem first to return an empty array and then we reload the cart.

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1); // Flaky Test = test that sometimes passes and sometimes fails.
    // Whether this test passes or fails depends on whether the cart array saved in localStorage is empty or not.
    // Mocks = lets us replace a method with a fake version
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // After we mock a method, we can check how many times this method was called.
    // Another thing to notice here, each test can have multiple expectations and the test will only pass if all of its expectations pass.
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart[0].quantity).toEqual(1); 
  });
});

