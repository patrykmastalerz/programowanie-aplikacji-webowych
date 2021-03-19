class App {
    input1: HTMLInputElement;
    input2: HTMLInputElement;
    input3: HTMLInputElement;
    input4: HTMLInputElement;

    sumInput: HTMLInputElement;
    avgInput: HTMLInputElement;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;

    constructor(){
        this.getDataInputs();
        this.getResultInputs();
        this.watchData();
        console.log("dziala");
    }

    getDataInputs(){
        this.input1 = document.querySelector("#data1");
        this.input2 = document.querySelector("#data2");
        this.input3 = document.querySelector("#data3");
        this.input4 = document.querySelector("#data4");
    }

    getResultInputs(){
        this.sumInput = document.querySelector("#sum");
        this.avgInput = document.querySelector("#avg");
        this.minInput = document.querySelector("#min");
        this.maxInput = document.querySelector("#max");
    }

    calculateData(){
        const numbers: number[] = [+this.input1.value, 
            +this.input2.value,
            +this.input3.value,
            +this.input4.value
        ]

        const sum = numbers.reduce((a,b) => a+b, 0);
        const avg = sum/numbers.length;
        const min = Math.min.apply(Math, numbers);
        const max = Math.max.apply(Math, numbers);

        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    }

    watchData(){
        this.input1.addEventListener("input", ()=> this.calculateData());
        this.input2.addEventListener("input", ()=> this.calculateData());
        this.input3.addEventListener("input", ()=> this.calculateData());
        this.input4.addEventListener("input", ()=> this.calculateData());
    }





}

const app = new App();