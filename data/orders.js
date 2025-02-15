export const orders = JSON.parse(localStorage.getItem('orders')) || []; 

export function addOrder(order) {
  orders.unshift(order); // It will add the order to the front of the array.
  saveToStorage(); 
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders)); 
}