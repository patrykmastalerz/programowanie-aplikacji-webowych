import { IAppStorage } from "./IAppStorage";
import { INoteInterface } from "./INoteInterface";

export class AppStorage implements IAppStorage{
    private readonly KEY_NOTES : string = 'notes'; 


    async saveData(note: INoteInterface){
        let existingNotes = await this.getData();
        existingNotes.push(note);

        localStorage.setItem(this.KEY_NOTES, JSON.stringify(existingNotes));
    }
    
    async getData(): Promise<INoteInterface[]> {
        const data = localStorage.getItem(this.KEY_NOTES);

        if (data) 
            return JSON.parse(data);
        return [];
    }

    async updateData(id: number, title: string, text: string, pinned: boolean){
        let existingNotes = await this.getData();

        const result = existingNotes.map(item => item.id === id ? { ...item, title, text, pinned } : item)
        localStorage.setItem(this.KEY_NOTES, JSON.stringify(result));
    }

    async removeData(id: number){
        const notes = await this.getData();
        notes.splice(notes.findIndex((n) => n.id === id), 1);
        localStorage.setItem(this.KEY_NOTES, JSON.stringify(notes));
    }


}