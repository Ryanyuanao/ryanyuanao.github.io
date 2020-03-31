;
! function() {
  'use strict';

  function calculate(expr) {
    return eval(expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/--/g, '- -'));
  };

  function Calculator(options) {
    if (Calculator.instance) {
      return Calculator.instance;
    } else if (!(this instanceof Calculator)) {
      return (Calculator.instance = new Calculator(options));
    }
    this.init(options);
  }

  Calculator.__OPERATORS__ = '+-×÷';
  Calculator.__ERROR_MSG__ = '错误';

  Calculator.prototype.init = function(options) {
    this.el = typeof options.el === 'string' ? document.querySelector(options.el) : this.el;
    this.buttons = typeof options.buttons === 'string' ? document.querySelector(options.buttons, this.el) : this
    .buttons;
    this.output = typeof options.output === 'string' ? document.querySelector(options.output, this.el) : this.output;
    this.result = this.output.innerHTML;
    this.currentNumber = '0';
    this.lastKey = '';
    this.currentOperator = '';
    this.calculated = false;
    this.maxlength = 100;
    this.bindEvent();
  };

  Calculator.prototype.bindEvent = function() {
    const buttons = this.buttons,
    self = this;
    var resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    buttons.addEventListener('click', function(ev) {
      let target = ev.target;
      if (target.nodeName === 'INPUT' && target.type === 'button') {
        self.access(target.value);
      }
    }, false);
    window.addEventListener(resizeEvt, function(e) {
      self.updateFontSize();
    }, false);
  };

  Calculator.prototype.access = function(key) {
    this.key = key;
    this.currentNumber = this.getCurrentNumber();
    if (this.isNumber(this.key)) {
      this.handleNumber();
    }　
    else if (this.isOperator(this.key)) {
      this.handleOperator();
    } else if (this.key === '.') {
      this.handlePoint();
    } else {
      this.handleOther();
    }

    this.lastKey = this.key;
    this.updateView();
  };

  Calculator.prototype.append = function(s) {
    this.result = (this.result === '0' || this.calculated) && !this.isOperator(s) && s !== '.' ? s : this.result + s;
    while (this.result.length > this.maxlength) {
      this.backSpace();
    }
    if (this.calculated) {
      this.calculated = false;
    }
  };

  Calculator.prototype.updateView = function() {
    this.output.innerHTML = this.result;
    this.updateFontSize();
  };

  Calculator.prototype.updateFontSize = function() {
    let parentWidth = this.output.parentNode.clientWidth - parseFloat(getComputedStyle(this.output.parentNode).padding),
    width = this.output.offsetWidth,
    fontSize = parseFloat(getComputedStyle(this.output.parentNode).fontSize),
    rate = 1;
    if (parentWidth < width) {
      rate = parentWidth / (width + fontSize);
    }

    this.output.style.transform = 'scale(' + rate + ')';
  };

  Calculator.prototype.isOperator = function(key) {
    return !!key && Calculator.__OPERATORS__.indexOf(key) > -1;
  };

  Calculator.prototype.isNumber = function(x) {
    return !isNaN(parseInt(x));
  };

  Calculator.prototype.handleNumber = function() {
    if (this.currentNumber === '0') {
      this.backSpace();
    }
    this.append(this.key);
  };

  Calculator.prototype.handleOperator = function() {
    if (this.result === Calculator.__ERROR_MSG__) {
      return;
    }
    if (this.isOperator(this.lastKey)) {
      this.backSpace();
    }
    this.currentOperator = this.key;
    this.append(this.key);
  };

  Calculator.prototype.handlePoint = function() {
    if (this.hasPoint(this.key) || this.currentNumber === Calculator.__ERROR_MSG__) {
      return;
    } else if (this.currentNumber === '') {
      this.currentNumber = '0';
      this.append(this.currentNumber);
    }
    this.append(this.key);
  };

  Calculator.prototype.handleOther = function() {
    const fn = {
      '±': 'negate',
      '%': 'percent',
      '←': 'backSpace',
      'AC': 'allClear',
      '=': 'calculate'
    }[this.key];
    if (fn) {
      this[fn]();
    }
  };

  Calculator.prototype.getCurrentNumber = function() {
    let index = this.currentOperator ? this.result.lastIndexOf(this.currentOperator) : -1;
    // 避免识别到负号
    if (this.currentOperator === '-' && this.result.charAt(index - 1) === '-') {
      index--;
    }
    return this.result.slice(index + 1);
  };

  Calculator.prototype.allClear = function() {
    this.currentNumber = '0';
    this.lastKey = '';
    this.currentOperator = '';
    this.result = '0';
  };

  Calculator.prototype.hasPoint = function() {
    return this.getCurrentNumber().indexOf('.') > -1;
  };

  Calculator.prototype.backSpace = function() {
    if (this.result === Calculator.__ERROR_MSG__) {
      return this.allClear();
    }
    this.result = this.result.slice(0, -1) || '0';
    let char = this.result.slice(-1);
    if (this.isOperator(char) && this.isOperator(this.lastKey)) {
      this.currentOperator = char;
      this.key = char;
    }
    this.lastKey = this.key;
    if (this.result === '0') {
      this.currentOperator = '';
    }
  };

  Calculator.prototype.calculate = function() {
    if (this.result === Calculator.__ERROR_MSG__) {
      return;
    }
    if (this.isOperator(this.lastKey)) {
      let base;
      if (this.lastKey && '+-'.indexOf(this.lastKey) > -1) {
        base = '0'
      } else {
        base = '1';
      }
      this.result += this.getCurrentNumber() || base;
    }
    this.result = calculate(this.result).toString().replace(/^-?Infinity|NaN$/, Calculator.__ERROR_MSG__);
    this.currentOperator = '';
    this.calculated = true;
  };

  Calculator.prototype.negate = function() {
    if (this.result === Calculator.__ERROR_MSG__) {
      return;
    }
    this.currentNumber = this.getCurrentNumber();
    this.result = this.result.slice(0, -this.currentNumber.length || this.result.length) + -this.currentNumber;
  };

  Calculator.prototype.percent = function() {
    if (this.result === Calculator.__ERROR_MSG__) {
      return;
    }
    this.currentNumber = this.getCurrentNumber();
    this.result = this.result.slice(0, -this.currentNumber.length || this.result.length) + this.currentNumber / 100;
  };
  window.Calculator = Calculator;
}();