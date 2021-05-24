import { App } from "./app";
import { AppStorage } from "./AppStorage";
import { INoteInterface } from "./INoteInterface";
import { Note } from "./Note";

export class Notes{
    private appStorage: AppStorage;
    private note: Note

    private titleInput: HTMLInputElement;
    private textInput: HTMLInputElement;
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
            this.note.createNote(n.id, n.title, n.text, "yellow");
            console.log(n);
        })
    }

    private createNoteFromInput(){
        this.createButton.addEventListener('click', () => {

            const id = this.note.generateId();
            const title = this.getTitleFromInput();
            const text = this.getTextFromInput();
            const note = this.note.createNote(id, title, text, 'red');
            this.appStorage.saveData(note);
        })
    }

    //pobieranie danych z inputa
    private getTitleFromInput(): string{
        return this.titleInput.value;
    }

    private getTextFromInput(): string{
        return this.textInput.value;
    }

    private getInputs(){
        this.titleInput = <HTMLInputElement>document.getElementById('title');
        this.textInput = <HTMLInputElement>document.getElementById('text');
    }

    private getCreateButton(){
        this.createButton = <HTMLButtonElement>document.getElementById('addNoteButton');
    }

    private getElements(){
        this.getInputs();
        this.getCreateButton();
    }

}