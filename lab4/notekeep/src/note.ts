import { AppStorage } from "./AppStorage";
import { INoteInterface } from "./INoteInterface";

export class Note{
    title: string; 
    text: string;
    color: string;
    date: string;
    isPinned: boolean;
    editBtn: HTMLButtonElement;


    wrapper: HTMLDivElement;
    appStorage: AppStorage;


    constructor(appStorage: AppStorage) {
        
        this.appStorage = appStorage;
        this.getWrapper();
    }



    changeIsPinned(){
        !this.isPinned;
    }


    //wyciagnac to do zewnetrzej klasy gdzie przekazujemy te elementy plus ojca    
    createNote(id: number, title: string, text:string, color: string): INoteInterface{
        const date = this.generateReadableDateXD();
        // const id = this.generateId()

        const noteWrapper: HTMLDivElement = document.createElement("div");
        noteWrapper.style.backgroundColor = color;
        noteWrapper.className = "notes-wrapper";
        noteWrapper.id = `${id}-wrapper`;

        const titleSpan: HTMLSpanElement = document.createElement("span");
        titleSpan.textContent = title;
        titleSpan.className = "note-title";
        titleSpan.id = `${id}-title`;
        
        const textSpan: HTMLSpanElement = document.createElement("span");
        textSpan.textContent = text;
        textSpan.className = "note-text";
        textSpan.id = `${id}-content`;

        const detailsWrapper: HTMLDivElement = document.createElement("div");
        detailsWrapper.className = "note-details";

        const dateSpan: HTMLSpanElement = document.createElement("span");
        dateSpan.textContent = date;
        dateSpan.className = "note-date";
        dateSpan.id = `${id}-date`;

        const btnWrapper: HTMLDivElement = document.createElement("div");


        const deleteBtn: HTMLButtonElement = document.createElement("button");
        deleteBtn.className = "note-btn";
        deleteBtn.textContent = "X"
        deleteBtn.id = `${id}-deleteBtn`;
        deleteBtn.addEventListener('click', () => {
            this.removeNote(id);
        })

        const editBtn: HTMLButtonElement = document.createElement("button");
        this.editBtn = editBtn;
        editBtn.className = "note-btn";
        editBtn.textContent = "E"
        editBtn.id = `${id}-editBtn`;
        editBtn.addEventListener('click', () => {
            this.createEditPop(id, title, text, color);
        })

        btnWrapper.appendChild(deleteBtn);
        btnWrapper.appendChild(editBtn);

        detailsWrapper.appendChild(dateSpan);
        detailsWrapper.appendChild(btnWrapper);

        noteWrapper.appendChild(titleSpan);
        noteWrapper.appendChild(textSpan);
        noteWrapper.appendChild(detailsWrapper);

        this.wrapper.appendChild(noteWrapper);

        return {
            id,
            title,
            text,
            color,
            date,
        };
    }


    private createEditPop(id: number, title: string, text:string, color: string){
        const editWrapper = document.createElement("div");
        editWrapper.className = "edit-wrapper";
        editWrapper.id = "edit"

        const editInnerWrapper = document.createElement("div");
        editInnerWrapper.className = "edit-innerWrapper";

        const editTitle = document.createElement("input");
        editTitle.id = "editTitle";
        editTitle.className = "input";

        const editText = document.createElement("input");
        editText.id = "editText";
        editText.className = "input";

        const editBtn = document.createElement("button");
        editBtn.id = "editText";
        editBtn.textContent = "edytuj";
        editBtn.className = "noteBtn";

        editBtn.addEventListener('click', () => {
            this.updateNote(id, editTitle.value, editText.value, "blue");
            this.appStorage.updateData(id, editTitle.value, editText.value)
            this.wrapper.removeChild(editWrapper);
        })


        editInnerWrapper.appendChild(editTitle);
        editInnerWrapper.appendChild(editText);
        editInnerWrapper.appendChild(editBtn);

        editWrapper.appendChild(editInnerWrapper)


        this.wrapper.appendChild(editWrapper);
    }


    private updateNote(id: number, title: string, text:string, color: string){
        const titleSpan: HTMLSpanElement = document.getElementById(`${id}-title`);
        titleSpan.textContent = title;

        const textSpan: HTMLSpanElement = document.getElementById(`${id}-content`);
        textSpan.textContent = text;

        const noteWrapper: HTMLElement = document.getElementById(`${id}-wrapper`);
        noteWrapper.style.backgroundColor = color;
    }

    removeNote(id:number){
        const note = <HTMLDivElement>document.getElementById(`${id}-wrapper`);

        this.appStorage.removeData(id);
        this.wrapper.removeChild(note);
    }

    private generateReadableDateXD(): string{
        const date = new Date();
        const curr_date = date.getDate();
        const curr_month = date.getMonth() + 1;
        const curr_year = date.getFullYear();

        return `${curr_date < 10 ? "0" + curr_date : curr_date}-${curr_month < 10 ? "0" + curr_month : curr_month}-${curr_year}`;
    }

    private getWrapper(){
        this.wrapper = <HTMLDivElement>document.getElementById('others');
    }

    public generateId(): number {
        return new Date().getTime();
    }

}