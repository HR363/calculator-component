class Calculator {
            constructor() {
                this.displayValue = '0';
                this.firstOperand = null;
                this.waitingForSecondOperand = false;
                this.operator = null;
                this.displayElement = document.getElementById('display');
                this.setupEventListeners();
            }
    
            setupEventListeners() {
                // Number buttons
                const numberButtons = document.querySelectorAll('.number');
                numberButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        this.inputNumber(button.dataset.number);
                    });
                });
                
                // Operator buttons
                const operatorButtons = document.querySelectorAll('.operator');
                operatorButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        if (button.dataset.operator) {
                            this.inputOperator(button.dataset.operator);
                        }
                    });
                });
                
                // Clear, equals, and backspace buttons
                document.getElementById('clear-btn').addEventListener('click', () => {
                    this.reset();
                });
                
                document.getElementById('equals-btn').addEventListener('click', () => {
                    this.performCalculation();
                });
                
                document.getElementById('backspace-btn').addEventListener('click', () => {
                    this.backspace();
                });
            }
            
            // Update the display with the current value
            updateDisplay() {
                this.displayElement.textContent = this.displayValue;
            }
            
            // Handle number input
            inputNumber(number) {
                if (this.waitingForSecondOperand) {
                    this.displayValue = number;
                    this.waitingForSecondOperand = false;
                } else {
                    this.displayValue = this.displayValue === '0' ? number : this.displayValue + number;
                }
                this.updateDisplay();
            }
            
            // Handle operator input
            inputOperator(operatorValue) {
                const inputValue = parseFloat(this.displayValue);

                if (this.operator && this.waitingForSecondOperand) {
                    this.operator = operatorValue;
                    return;
                }
                
                if (this.firstOperand === null) {
                    this.firstOperand = inputValue;
                } else if (this.operator) {
                    const result = this.calculate(this.firstOperand, inputValue, this.operator);
                    this.displayValue = String(result);
                    this.firstOperand = result;
                }
                
                this.waitingForSecondOperand = true;
                this.operator = operatorValue;
                this.updateDisplay();
            }
            
            // Perform the calculation based on the operator
            // and the two operands
            calculate(firstOperand, secondOperand, operator) {
                switch (operator) {
                    case '+':
                        return firstOperand + secondOperand;
                    case '-':
                        return firstOperand - secondOperand;
                    case '*':
                        return firstOperand * secondOperand;
                    case '/':
                        return firstOperand / secondOperand;
                    case '%':
                        return firstOperand % secondOperand;
                    default:
                        return secondOperand;
                }
            }
            
            // Perform the calculation when equals button is pressed
            // and update the display
            performCalculation() {
                if (!this.operator || this.firstOperand === null) {
                    return;
                }
                
                const inputValue = parseFloat(this.displayValue);
                const result = this.calculate(this.firstOperand, inputValue, this.operator);
                
                this.displayValue = String(result);
                this.firstOperand = result;
                this.operator = null;
                this.waitingForSecondOperand = false;
                this.updateDisplay();
            }
            
            // Reset the calculator
            reset() {
                this.displayValue = '0';
                this.firstOperand = null;
                this.waitingForSecondOperand = false;
                this.operator = null;
                this.updateDisplay();
            }
            
            // Handle backspace button
            backspace() {
                if (this.displayValue.length > 1) {
                    this.displayValue = this.displayValue.slice(0, -1);
                } else {
                    this.displayValue = '0';
                }
                this.updateDisplay();
            }
        }
        
        // Initialize calculator when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new Calculator();
        });