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

    updateData(id: number, title: string, text: string, isPinned: boolean){
        let existingNotes = this.getData();

        const result = existingNotes.map(item => item.id === id ? { ...item, title, text, isPinned } : item)
        localStorage.setItem(this.KEY_NOTES, JSON.stringify(result));
    }

    removeData(id: number){
        const notes = this.getData();
        notes.splice(notes.findIndex((n) => n.id === id), 1);
        localStorage.setItem(this.KEY_NOTES, JSON.stringify(notes));
    }
}