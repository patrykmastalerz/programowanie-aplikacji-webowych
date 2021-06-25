import { AppStorage } from "./AppStorage";
import { IAppStorage } from "./IAppStorage";
import { INoteInterface } from "./INoteInterface";
import { NoteUi } from "./NoteUi";

export class Note{
    editBtn: HTMLButtonElement;
    pinBtn: HTMLButtonElement;

    wrapper: HTMLDivElement;
    pinnedWrapper: HTMLDivElement;
    appStorage: IAppStorage;

    constructor(appStorage: IAppStorage) {
        
        this.appStorage = appStorage;
        this.getWrapper();
    }

    createNote(id: number, title: string, text:string, color: string, pinned: boolean): INoteInterface{
        const date = this.generateReadableDateXD();
        let pin = pinned;


        const noteWrapper = NoteUi.createElement<HTMLDivElement>('div', `${id}-wrapper`, "notes-wrapper", undefined , color);

        const titleSpan = NoteUi.createElement<HTMLSpanElement>('span', `${id}-title`, "note-title", title , undefined);

        const textSpan = NoteUi.createElement<HTMLSpanElement>('span', `${id}-content`, "note-text", text , undefined);


        const detailsWrapper: HTMLDivElement = document.createElement("div");
        detailsWrapper.className = "note-details";

        const dateSpan = NoteUi.createElement<HTMLSpanElement>('span', `${id}-date`, "note-date", date , undefined);

        const btnWrapper: HTMLDivElement = document.createElement("div");


        const deleteBtn = NoteUi.createElement<HTMLButtonElement>('button', `${id}-deleteBtn`, "note-btn", "X" , undefined);
        deleteBtn.addEventListener('click', async () => {
            await this.removeNote(id, pin);
        })

        const editBtn = NoteUi.createElement<HTMLButtonElement>('button',  `${id}-editBtn`, "note-btn", "E" , undefined);
        editBtn.addEventListener('click', () => {
            this.createEditPop(id, pin);
        })

        const pinBtn = NoteUi.createElement<HTMLButtonElement>('button', `${id}-pinBtn`, "note-btn", "P" , undefined);

        pinBtn.addEventListener('click', () => {
            if(pin === false){
                pin = !pin;
                this.pinnedWrapper.appendChild(noteWrapper);
                this.appStorage.updateData(id, title, text, pin)

            } else if(pin === true){
                pin = !pin;
                this.wrapper.appendChild(noteWrapper)
                this.appStorage.updateData(id, title, text, pin)
            }


        })

        btnWrapper.appendChild(pinBtn);
        btnWrapper.appendChild(deleteBtn);
        btnWrapper.appendChild(editBtn);


        detailsWrapper.appendChild(dateSpan);
        detailsWrapper.appendChild(btnWrapper);

        noteWrapper.appendChild(titleSpan);
        noteWrapper.appendChild(textSpan);
        noteWrapper.appendChild(detailsWrapper);

        console.log(pin);
        if(pin === false){
            
            this.wrapper.appendChild(noteWrapper);
        }
        else if(pin === true) {
            this.pinnedWrapper.appendChild(noteWrapper);
        }

        return {
            id: id,
            title: title,
            text: text,
            color: color,
            date: date,
            pinned: pin,
        };
    }


    private createEditPop(id: number, pin: boolean){
        const editWrapper = document.createElement("div");
        editWrapper.className = "edit-wrapper";
        editWrapper.id = "edit"

        const editInnerWrapper = document.createElement("div");
        editInnerWrapper.className = "edit-innerWrapper";

        const editTitle = document.createElement("input");
        editTitle.id = "editTitle";
        editTitle.className = "input";
        editTitle.placeholder = "Podaj nowy tytul"

        const editText = document.createElement("input");
        editText.id = "editText";
        editText.className = "input";
        editText.placeholder = "Podaj nowy tekst"

        const editBtn = document.createElement("button");
        editBtn.id = "editText";
        editBtn.textContent = "edytuj";
        editBtn.className = "noteBtn";

        editBtn.addEventListener('click', () => {
            if(editTitle.value == "" || editText.value == ""){
                window.alert("Wprowadz dane!");
            } else{
                this.updateNote(id, editTitle.value, editText.value);
                this.appStorage.updateData(id, editTitle.value, editText.value, pin)
                document.body.removeChild(editWrapper);
            }

        })
        editInnerWrapper.appendChild(editTitle);
        editInnerWrapper.appendChild(editText);
        editInnerWrapper.appendChild(editBtn);
        editWrapper.appendChild(editInnerWrapper)
        document.body.appendChild(editWrapper);
    }


    private updateNote(id: number, title: string, text:string){
        const titleSpan: HTMLSpanElement = document.getElementById(`${id}-title`);
        titleSpan.textContent = title;

        const textSpan: HTMLSpanElement = document.getElementById(`${id}-content`);
        textSpan.textContent = text;
    }

    private removeNote(id:number, pin: boolean){
        const note = <HTMLDivElement>document.getElementById(`${id}-wrapper`);
        // const data = await this.appStorage.getData();
        if(pin == true){
            this.pinnedWrapper.removeChild(note);
            this.appStorage.removeData(id);
        }
        else if(pin == false) {
            this.wrapper.removeChild(note);
            this.appStorage.removeData(id);
        }
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
        this.pinnedWrapper = <HTMLDivElement>document.getElementById('pinned');
    }

    public generateId(): number {
        return new Date().getTime();
    }

}