import {formatCurrency} from '../../scripts/utils/money.js'; 

// To create a test suite in jasmine: 
describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95'); 
    // 'expect' - lets us compare a value to another value.
    // To compare the value to another value, 'expect' gives us object. This object has many methods to do comparisons. One of them is: '.toEqual()'.
  }); // the it() function creates a test

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  describe("rounding", () => {
    it("rounds up to the nearest cent", () => {
      expect(formatCurrency(2000.5)).toEqual("20.01");
    });

    it("rounds down to the nearest cent", () => {
      expect(formatCurrency(2000.4)).toEqual("20.00");
    });
  });
});
/* 
describe(description, specDefinitions)
- Create a group of specs (often called asuite).
- Calls to 'describe' can be nested within other calls to compose your suite as a tree. 

** We can use desctibe inside describe to organize our tests further. 
*/  