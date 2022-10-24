function sum(a, b) {
  return a + b;
}

describe('sum function', () => {
  // describe('', () => {
  //   it('',()=>{})
  // })
  // it / test
  it('should return correct sum of two numbers', () => {
    // setup - variable initialize, mock

    // execute test unit, test function
    const result = sum(1, 2);

    // compare expected result with actual result
    expect(result).toBe(3);
  });
});
