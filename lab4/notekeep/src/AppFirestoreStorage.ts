import firebase from 'firebase';
import {firebaseConfig} from './config'
import { IAppStorage } from './IAppStorage';
import { INoteDetails } from './INoteDetails';
import { INoteInterface } from './INoteInterface';

export class AppFirestoreStorage implements IAppStorage{


    firebaseApp = firebase.initializeApp(firebaseConfig);
    db = this.firebaseApp.firestore();

    async saveData(note: INoteInterface) {
        const details = this.mapToNoteDetails(note);
        const id:string = note.id.toString();

        // const res = await this.db.collection("notes").doc(id).set(details);
        this.db.collection("notes").doc(id).set(details);

    }

    async updateData(id: number, title: string, text: string, pinned: boolean) {

        const note = await this.getNote(id.toString());
        note.title = title;
        note.text = text;
        note.pinned = pinned;
        
        


        const res = await this.db.collection("notes").doc(id.toString()).update(note);
    }

    async getData(): Promise<INoteInterface[]> {
        // return this.db.collection("notes").get().then(res => res.data());
        const data = await this.db.collection("notes").get().then((res) => {
            const tempDoc: INoteInterface[] = [];
            res.forEach((doc) => {
               tempDoc.push({ id: +doc.id, ...doc.data() as INoteDetails })
               console.log(doc.data())
            })
            console.log(tempDoc)
            return tempDoc;
         })

        console.log(data);
        if (data) 
            return data;
        return [];
    }
    
    public async test(): Promise<INoteInterface[]> {
        // return this.db.collection("notes").get().then(res => res.data());
        const data = await this.db.collection("notes").get().then((res) => {
            const tempDoc: any = [];
            res.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() })
                console.log(doc.data())
            })
            return tempDoc as INoteInterface[];
         })

        console.log(data);
        if (data) 
            return data;
        return [];
    }

    async removeData(id: number){
        const res = await this.db.collection("notes").doc(id.toString()).delete();
    }



    private async getNote(id: string): Promise<INoteDetails>{
        return this.db.collection("notes").doc(id).get().then(res => res.data()) as Promise<INoteDetails>;
    }

    private mapToNoteDetails(note: INoteInterface): INoteDetails{
        return {
            title: note.title, 
            text: note.text,
            color: note.color,
            date: note.date,
            pinned: note.pinned
        }

    }

}