import { App } from "./app";
import { AppStorage } from "./AppStorage";
import { INoteInterface } from "./INoteInterface";
import { Note } from "./Note";

//tworzenie z inputa oraz z localstorage
export class Notes{
    private appStorage: AppStorage;
    private note: Note

    private titleInput: HTMLInputElement;
    private textInput: HTMLInputElement;
    private colorInput: HTMLSelectElement;
    private createButton: HTMLButtonElement;

    constructor(appStorage: AppStorage, note: Note) {
        this.appStorage = appStorage;
        this.note = note;
        
        this.getElements();
        this.createNotesFromLocalStorage();
        this.createNoteFromInput();
    }

    private createNotesFromLocalStorage(){
        const data = this.appStorage.getData();
        data.forEach( n => {
                this.note.createNote(n.id, n.title, n.text, n.color, n.pinned);
        })
    }


    private createNoteFromInput(){
        this.createButton.addEventListener('click', () => {

            const id = this.note.generateId();
            const title = this.getTitleFromInput();
            const text = this.getTextFromInput();
            const color = this.getColorFromSelect();
            if (title == "" || text == ""){
                window.alert("Wprowadz dane!");
            } else {
                const note = this.note.createNote(id, title, text, color, false);
                this.appStorage.saveData(note);
                this.resetInputs();
            }
        })
    }

    private checkInput(title: string, text: string){
        window.alert("Wprowadz dane!");
    }

    private getTitleFromInput(): string{
        return this.titleInput.value;
    }

    private getTextFromInput(): string{
        return this.textInput.value;
    }

    private getColorFromSelect(): string{
        return this.colorInput.value;
    }

    private getInputs(){
        this.titleInput = <HTMLInputElement>document.getElementById('title');
        this.textInput = <HTMLInputElement>document.getElementById('text');
        this.colorInput = <HTMLSelectElement>document.getElementById('color');
    }

    private getCreateButton(){
        this.createButton = <HTMLButtonElement>document.getElementById('addNoteButton');
    }

    private getElements(){
        this.getInputs();
        this.getCreateButton();
    }

    
    private resetInputs(){
        this.titleInput.value = "";
        this.textInput.value = ""
    }

}