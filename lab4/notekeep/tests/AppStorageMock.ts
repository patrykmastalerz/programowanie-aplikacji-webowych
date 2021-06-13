import { IAppStorage } from '../src/IAppStorage';
import { INoteInterface } from '../src/INoteInterface';

export class AppStorageMock implements IAppStorage{

    private readonly KEY_NOTES : string = 'notes'; 

    async saveData(note: INoteInterface){

    }
    
    async getData(): Promise<INoteInterface[]> {
        const data = localStorage.getItem(this.KEY_NOTES);

        if (data) 
            return [{
                id: 1,
                title: "tytul", 
                text: 'tekst',
                color: 'white',
                date: '10-10-2010',
                pinned: true
            }]
        return [];
    }

    async updateData(id: number, title: string, text: string, pinned: boolean){

    }

    async removeData(id: number){

    }
}
