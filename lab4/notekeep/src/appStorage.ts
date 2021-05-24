import { INoteInterface } from "./INoteInterface";

export class AppStorage{
    private readonly KEY_NOTES : string = 'notes'; 


    saveData(note: INoteInterface){
        let existingNotes = this.getData();
        existingNotes.push(note);

        localStorage.setItem(this.KEY_NOTES, JSON.stringify(existingNotes));
    }
    
    getData(): INoteInterface[] {
        const data = localStorage.getItem(this.KEY_NOTES);

        if (data) 
            return JSON.parse(data);
        return [];
    
    }

    updateData(id: number, title: string, text: string){
        let existingNotes = this.getData();
        // const noteToEdit = existingNotes.filter( n => n.id = note.id);
        const noteIndex = existingNotes.findIndex((n => n.id = id));
        existingNotes[noteIndex].title = title;
        existingNotes[noteIndex].text = text;

        localStorage.setItem(this.KEY_NOTES, JSON.stringify(existingNotes));

    }

    removeData(id: number){
        const notes = this.getData();
        notes.splice(notes.findIndex((n) => n.id === id), 1);
        localStorage.setItem(this.KEY_NOTES, JSON.stringify(notes));
    }
}