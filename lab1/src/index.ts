class App1{

    Input: HTMLInputElement;
    InputDatasWrapper: HTMLDivElement;
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

        if(numbers.length == 0){
            this.resetResultInputs();
        }
    }



    clearInputDatas(){
        while (this.InputDatasWrapper.firstChild) {
            this.InputDatasWrapper.removeChild(this.InputDatasWrapper.firstChild);
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
        input.addEventListener("input", ()=> this.createDataInputs());
        

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

    createDataInputs(){
        this.clearInputDatas();
        this.DatasInputs = [];
        let quality: number = +this.Input.value;

        for (let index = 0; index < quality; index++) {
            let input: HTMLInputElement = document.createElement("input");
            input.id = index.toString();
            input.className = "data";
            this.InputDatasWrapper.appendChild(input);
            this.InputDatasWrapper.appendChild(this.createDeleteButton(index));
            this.InputDatasWrapper.appendChild(document.createElement("br"));
            this.DatasInputs.push(input);
            input.addEventListener("input", () => this.calculateData());
        }
        this.resetResultInputs();
    }

    createDeleteButton(index: number) : HTMLButtonElement{
        const button: HTMLButtonElement = document.createElement("button");

        button.innerText = "usun";
        button.id = index + "_button";
        button.addEventListener("click", () => {
            this.deleteInput(index);
        })
        return button;
    }

    deleteInput(index: number){
        const button: HTMLButtonElement = document.getElementById(index+"_button") as HTMLButtonElement;
        var elem = document.getElementById(index.toString());
        elem.parentNode.removeChild(elem);
        button.parentNode.removeChild(button);

        let newDataInputsArray: HTMLInputElement[] = [];
        let inputElements = document.querySelectorAll(".data");
        for (let index = 0; index < inputElements.length; index++) {
            const element = inputElements[index] as HTMLInputElement;
            newDataInputsArray.push(element);
        }
        this.DatasInputs = newDataInputsArray;
        this.calculateData();
    }

    createWrapperForDatas(){
        const inputsWrapper: HTMLDivElement = document.createElement("div");
        document.body.appendChild(inputsWrapper);
        this.InputDatasWrapper = inputsWrapper;
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
        return Math.max.apply(Math, numbers);
    }
}

const app1 = new App1();