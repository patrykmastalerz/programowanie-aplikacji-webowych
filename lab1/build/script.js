var App = /** @class */ (function () {
    function App() {
        this.getDataInputs();
        this.getResultInputs();
        this.watchData();
        console.log("dziala");
    }
    App.prototype.getDataInputs = function () {
        this.input1 = document.querySelector("#data1");
        this.input2 = document.querySelector("#data2");
        this.input3 = document.querySelector("#data3");
        this.input4 = document.querySelector("#data4");
    };
    App.prototype.getResultInputs = function () {
        this.sumInput = document.querySelector("#sum");
        this.avgInput = document.querySelector("#avg");
        this.minInput = document.querySelector("#min");
        this.maxInput = document.querySelector("#max");
    };
    App.prototype.calculateData = function () {
        var numbers = [+this.input1.value,
            +this.input2.value,
            +this.input3.value,
            +this.input4.value
        ];
        var sum = numbers.reduce(function (a, b) { return a + b; }, 0);
        var avg = sum / numbers.length;
        var min = Math.min.apply(Math, numbers);
        var max = Math.max.apply(Math, numbers);
        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    };
    App.prototype.watchData = function () {
        var _this = this;
        this.input1.addEventListener("input", function () { return _this.calculateData(); });
        this.input2.addEventListener("input", function () { return _this.calculateData(); });
        this.input3.addEventListener("input", function () { return _this.calculateData(); });
        this.input4.addEventListener("input", function () { return _this.calculateData(); });
    };
    return App;
}());
var app = new App();
