class App1{

    Input: HTMLInputElement;
    InputsWrapper: HTMLDivElement;
    DatasInputs: HTMLInputElement[] = [];
    InputSum: HTMLInputElement;
    InputAvg: HTMLInputElement;
    InputMin: HTMLInputElement;
    InputMax: HTMLInputElement;

    constructor(){
        this.renderUI();
    }


    renderUI(){
        this.InputSum = this.createResultInput("sum");
        this.InputAvg = this.createResultInput("avg");
        this.InputMin = this.createResultInput("min");
        this.InputMax = this.createResultInput("max");
        this.createQualityInput();
        this.createDeleteButton();
        this.createWrapperForDatas();
    }

    calculateData(){
        let numbers: number[] = [];
        

        for (let index = 0; index < this.DatasInputs.length; index++) {
            const element = this.DatasInputs[index];
            numbers.push(+element.value);
        }

        if(!numbers.some(isNaN)){
            let calculator = new Calculator();
            this.InputSum.value = calculator.sum(numbers).toString();
            this.InputAvg.value = calculator.avg(numbers).toString();
            this.InputMin.value = calculator.min(numbers).toString();
            this.InputMax.value = calculator.max(numbers).toString();
        } else {
            window.alert("Wprowadzona dana nie jest liczba! Popraw to!");
            this.resetResultInputs();
        }
    }



    clearInputDatas(){
        while (this.InputsWrapper.firstChild) {
            this.InputsWrapper.removeChild(this.InputsWrapper.firstChild);
        }
    }

    resetResultInputs(){
        this.InputSum.value = "0";
        this.InputAvg.value = "0";
        this.InputMin.value = "0";
        this.InputMax.value = "0";
    }

    createQualityInput(){
        const input: HTMLInputElement = document.createElement("input");
        input.id = "inputQuality";
        const label: HTMLLabelElement = document.createElement("label");
        label.innerHTML= "Quality inputs";
        input.addEventListener("input", ()=> this.createInputs());
        

        this.Input = input;
        document.body.appendChild(input);
        document.body.appendChild(label);      
        document.body.appendChild(document.createElement("br"));  
    }


    createResultInput(type: string) : HTMLInputElement {
        const input: HTMLInputElement = document.createElement("input");
        input.id = type;
        input.readOnly = true;
        const label: HTMLLabelElement = document.createElement("label");
        label.innerHTML= type;
        document.body.appendChild(input);
        document.body.appendChild(label);
        document.body.appendChild(document.createElement("br"));
       
        return input;
    }

    createInputs(){
        this.clearInputDatas();
        this.DatasInputs = [];
        let quality: number = +this.Input.value;

        for (let index = 0; index < quality; index++) {
            let input: HTMLInputElement = document.createElement("input");
            input.className = "data";
            this.InputsWrapper.appendChild(input);
            this.InputsWrapper.appendChild(document.createElement("br"));
            this.DatasInputs.push(input);
            input.addEventListener("input", () => this.calculateData());
        }
    }

    createDeleteButton(){
        const button: HTMLButtonElement = document.createElement("button");

        button.innerText = "usun";
        button.addEventListener("click", () => {
            this.clearInputDatas();
            this.DatasInputs = [];
            this.resetResultInputs();
        })

        document.body.appendChild(button);
   
        document.body.appendChild(document.createElement("br"));  
    }


    createWrapperForDatas(){
        const inputsWrapper: HTMLDivElement = document.createElement("div");
        document.body.appendChild(inputsWrapper);
        this.InputsWrapper = inputsWrapper;
    }

}


class Calculator{

    sum(numbers: Array<number>): number {
        const sum: number = numbers.reduce((a, b) => a + b, 0);
        return sum;
    }

    avg(numbers: Array<number>): number {
        const sum: number = numbers.reduce((a, b) => a + b, 0);
        return Number((sum / numbers.length));
    }

    min(numbers: Array<number>): number {
        return  Math.min.apply(Math, numbers);
    }

    max(numbers: Array<number>): number {
        return Math.min.apply(Math, numbers);
    }
}

const app1 = new App1();