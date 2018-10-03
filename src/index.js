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

  solve(arrStates, arrNumbers) {
    let multiplier = 1;

    for (let i = 0, len = arrStates.length; i < len; i++) {
      let firstArg = arrNumbers[i];
      let secondArg = arrNumbers[i + 1];

      if (arrStates[i] === 'num') return this.rezult.push(arrNumbers[i] * multiplier);

      if (arrStates[i] === 'multiply') {
        multiplier *= firstArg;
        continue;
      }

      if (arrStates[i] === 'pow') {
        arrNumbers[i + 1] = Math.pow(secondArg, firstArg);
        if (secondArg < 0 && (arrNumbers[i + 1] > 0)) arrNumbers[i + 1] *= -1;
        continue;
      }

      if (arrStates[i] === 'devide') {
        arrNumbers[i + 1] = secondArg / firstArg;
      }
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
