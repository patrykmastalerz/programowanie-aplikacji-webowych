var App1 = /** @class */ (function () {
    function App1() {
        this.DatasInputs = [];
        this.renderUI();
    }
    App1.prototype.renderUI = function () {
        this.InputSum = this.createResultInput("sum");
        this.InputAvg = this.createResultInput("avg");
        this.InputMin = this.createResultInput("min");
        this.InputMax = this.createResultInput("max");
        this.createQualityInput();
        this.createDeleteButton();
        this.createWrapperForDatas();
    };
    App1.prototype.calculateData = function () {
        var numbers = [];
        for (var index = 0; index < this.DatasInputs.length; index++) {
            var element = this.DatasInputs[index];
            numbers.push(+element.value);
        }
        if (!numbers.some(isNaN)) {
            var calculator = new Calculator();
            this.InputSum.value = calculator.sum(numbers).toString();
            this.InputAvg.value = calculator.avg(numbers).toString();
            this.InputMin.value = calculator.min(numbers).toString();
            this.InputMax.value = calculator.max(numbers).toString();
        }
        else {
            window.alert("Wprowadzona dana nie jest liczba! Popraw to!");
            this.resetResultInputs();
        }
    };
    App1.prototype.clearInputDatas = function () {
        while (this.InputsWrapper.firstChild) {
            this.InputsWrapper.removeChild(this.InputsWrapper.firstChild);
        }
    };
    App1.prototype.resetResultInputs = function () {
        this.InputSum.value = "0";
        this.InputAvg.value = "0";
        this.InputMin.value = "0";
        this.InputMax.value = "0";
    };
    App1.prototype.createQualityInput = function () {
        var _this = this;
        var input = document.createElement("input");
        input.id = "inputQuality";
        var label = document.createElement("label");
        label.innerHTML = "Quality inputs";
        input.addEventListener("input", function () { return _this.createInputs(); });
        this.Input = input;
        document.body.appendChild(input);
        document.body.appendChild(label);
        document.body.appendChild(document.createElement("br"));
    };
    App1.prototype.createResultInput = function (type) {
        var input = document.createElement("input");
        input.id = type;
        input.readOnly = true;
        var label = document.createElement("label");
        label.innerHTML = type;
        document.body.appendChild(input);
        document.body.appendChild(label);
        document.body.appendChild(document.createElement("br"));
        return input;
    };
    App1.prototype.createInputs = function () {
        var _this = this;
        this.clearInputDatas();
        this.DatasInputs = [];
        var quality = +this.Input.value;
        for (var index = 0; index < quality; index++) {
            var input = document.createElement("input");
            input.className = "data";
            this.InputsWrapper.appendChild(input);
            this.InputsWrapper.appendChild(document.createElement("br"));
            this.DatasInputs.push(input);
            input.addEventListener("input", function () { return _this.calculateData(); });
        }
    };
    App1.prototype.createDeleteButton = function () {
        var _this = this;
        var button = document.createElement("button");
        button.innerText = "usun";
        button.addEventListener("click", function () {
            _this.clearInputDatas();
            _this.DatasInputs = [];
            _this.resetResultInputs();
        });
        document.body.appendChild(button);
        document.body.appendChild(document.createElement("br"));
    };
    App1.prototype.createWrapperForDatas = function () {
        var inputsWrapper = document.createElement("div");
        document.body.appendChild(inputsWrapper);
        this.InputsWrapper = inputsWrapper;
    };
    return App1;
}());
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.sum = function (numbers) {
        var sum = numbers.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    };
    Calculator.prototype.avg = function (numbers) {
        var sum = numbers.reduce(function (a, b) { return a + b; }, 0);
        return Number((sum / numbers.length));
    };
    Calculator.prototype.min = function (numbers) {
        return Math.min.apply(Math, numbers);
    };
    Calculator.prototype.max = function (numbers) {
        return Math.max.apply(Math, numbers);
    };
    return Calculator;
}());
var app1 = new App1();
