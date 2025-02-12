import { formatCurrency } from '../../scripts/utils/money.js';  

console.log('test suite: formatCurrency');

// Give each of these test cases a name.
console.log('converts cents into dollars'); 

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed'); 
}

console.log('works with 0');

if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
} // a test case

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed'); 
}

console.log('rounds down to the nearest cent');

if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed'); 
}
/* 
Easiest way to test:
- Open the website and try out the code
This is called manual testing. 
Advantage: 
- It is really useful for quickly checking to see if everything is working. 
Disadvantages of Manual Testing:
1. Hard to test every situation
2. Hard to re-test the code

Automated testing = using code to test code
Steps:
1. Create test suite
2. Create tests
3. Compare values and display result


2 Types of Test Cases:
1. Basic test cases = tests if the code is working or not
2. Edge cases = test with values that are a little bit tricky, in our case, the last two cases are edge cases. 

Automated test make it really easy to retest our code after we make any changes.

When we do testing, we group related tests together. 
A group of related tests is called a test suite.

Testing Framework
= external library that helps us write tests easier
Most testing frameworks are similar.
Other testing frameworks: Jest (for ReactJS), MochaJS

A testing framework helps us do all of the things we were doing before and it also provides a nice looking website where we can see all the test results.

Best Practice in Testing:
- Test each condition of an if-statement
- We try to maximize test coverage

Test Coverage = how much of the code is being tested

*/