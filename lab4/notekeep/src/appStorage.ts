
export class appStorage{


    setData(note: string){
        let existingNotes = this.getData();
        existingNotes.push(note);

        localStorage.setItem('notes', existingNotes);
    }
    
    getData() {
        const data = localStorage.getItem('notes');

        if (data) {
            return data
            return JSON.parse(data);
        } else {
            return [];
        }
    }
}