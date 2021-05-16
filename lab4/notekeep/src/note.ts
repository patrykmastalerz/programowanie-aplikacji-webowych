export class Note{
    title: string; 
    text: string;
    color: string;
    date: string;
    wrapper: HTMLDivElement;


    constructor() {
        this.getWrapper();
    }

    getWrapper(){
        this.wrapper = <HTMLDivElement>document.getElementById('wrapper');
    }

    createNote(id:string, title: string, text:string, color: string, date:string){
        const noteWrapper: HTMLDivElement = document.createElement("div");
        noteWrapper.style.backgroundColor = color;

        const titleSpan: HTMLSpanElement = document.createElement("span");
        titleSpan.textContent = title;
        
        const textSpan: HTMLSpanElement = document.createElement("span");
        textSpan.textContent = text;

        const dateSpan: HTMLSpanElement = document.createElement("span");
        dateSpan.textContent = date;

        noteWrapper.appendChild(titleSpan);
        noteWrapper.appendChild(textSpan);
        noteWrapper.appendChild(dateSpan);

        this.wrapper.appendChild(noteWrapper);
    }

    removeNote(id:string){
        const note = <HTMLDivElement>document.getElementById(id);

        this.wrapper.removeChild(note);
    }



}