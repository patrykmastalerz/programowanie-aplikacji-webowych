import { INoteInterface } from "./INoteInterface";

export class appStorage{


    setData(note: INoteInterface){
        let existingNotes = this.getData();
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));
    }
    
    getData(): (INoteInterface[]) {
        const data = localStorage.getItem('notes');

        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
}