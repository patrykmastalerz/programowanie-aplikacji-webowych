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
        if (numbers.length == 0) {
            this.resetResultInputs();
        }
    };
    App1.prototype.clearInputDatas = function () {
        while (this.InputDatasWrapper.firstChild) {
            this.InputDatasWrapper.removeChild(this.InputDatasWrapper.firstChild);
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
        input.addEventListener("input", function () { return _this.createDataInputs(); });
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
    App1.prototype.createDataInputs = function () {
        var _this = this;
        this.clearInputDatas();
        this.DatasInputs = [];
        var quality = +this.Input.value;
        for (var index = 0; index < quality; index++) {
            var input = document.createElement("input");
            input.id = index.toString();
            input.className = "data";
            this.InputDatasWrapper.appendChild(input);
            this.InputDatasWrapper.appendChild(this.createDeleteButton(index));
            this.InputDatasWrapper.appendChild(document.createElement("br"));
            this.DatasInputs.push(input);
            input.addEventListener("input", function () { return _this.calculateData(); });
        }
        this.resetResultInputs();
    };
    App1.prototype.createDeleteButton = function (index) {
        var _this = this;
        var button = document.createElement("button");
        button.innerText = "usun";
        button.id = index + "_button";
        button.addEventListener("click", function () {
            _this.deleteInput(index);
        });
        return button;
    };
    App1.prototype.deleteInput = function (index) {
        var button = document.getElementById(index + "_button");
        var elem = document.getElementById(index.toString());
        elem.parentNode.removeChild(elem);
        button.parentNode.removeChild(button);
        var newDataInputsArray = [];
        var inputElements = document.querySelectorAll(".data");
        for (var index_1 = 0; index_1 < inputElements.length; index_1++) {
            var element = inputElements[index_1];
            newDataInputsArray.push(element);
        }
        this.DatasInputs = newDataInputsArray;
        this.calculateData();
    };
    App1.prototype.createWrapperForDatas = function () {
        var inputsWrapper = document.createElement("div");
        document.body.appendChild(inputsWrapper);
        this.InputDatasWrapper = inputsWrapper;
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
