class SmartCalculator {
  constructor(initialValue) {
    this.conclusion = [initialValue];
    this.expression = ['num'];
    this.rezult = [];
  }


  add(number) {
    this.conclusion.push(number);
    this.expression.push('num');
    return this;
  }

  subtract(number) {
    this.conclusion.push(-number);
    this.expression.push('num');
    return this;
  }

  multiply(number) {
    this.conclusion.push(number);
    this.expression.push('multiply');
    return this;
  }

  devide(number) {
    this.conclusion.push(number);
    this.expression.push('devide');
    return this;
  }

  pow(number) {
    this.conclusion.push(number);
    this.expression.push('pow');
    return this;
  }

  solve(arrStates, arrNumber) {
    let firstArg = arrNumber[0];
    let secondArg = 1;
    if (arrStates[0] === 'num') this.rezult.push(firstArg);
    if (arrStates[0] === 'multiply') {
      for (let i = 0, len = arrStates.length; i < len; i++) {
        if (arrStates[i] === 'multiply') firstArg *= arrNumber[i + 1];
        if (arrStates[i] === 'pow') {
          secondArg = Math.pow(arrNumber[i + 1], secondArg);
          if (arrNumber[i + 1] < 0) secondArg *= -1;
        }
      }
      this.rezult.push(firstArg * secondArg);
    }
    if (arrStates[0] === 'devide') {
      firstArg = arrNumber[1] / firstArg;
      for (let i = 1, len = arrStates.length - 1; i < len; i++) {
        if (arrStates[i] === 'devide') firstArg /= arrNumber[i];
      }
      this.rezult.push(firstArg);
    }
    if (arrStates[0] === 'pow') {
      for (let i = 0, len = arrStates.length; i < len; i++) {
        if (arrStates[i] === 'pow') {
          firstArg = Math.pow(arrNumber[i + 1], firstArg);
          if (arrNumber[i + 1] < 0) firstArg *= -1;
        }
        if (arrStates[i] === 'multiply') firstArg *= arrNumber[i + 1];
      }
      this.rezult.push(firstArg);
    }
  }

  valueOf() {
    this.conclusion.reverse();
    this.expression.reverse();
    while (this.expression.length !== 0) {
      let firstNum = this.expression.indexOf('num');
      this.solve(this.expression.splice(0, firstNum + 1), this.conclusion.splice(0, firstNum + 1));
    }
    return this.rezult.reduce((a, b) => a + b, 0);
  }
}


module.exports = SmartCalculator;
