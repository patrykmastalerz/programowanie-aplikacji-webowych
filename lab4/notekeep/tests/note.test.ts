import { Note } from '../src/Note';
import { Notes } from '../src/Notes';
import { DatabaseConfiguration } from '../src/configDatabase';
import { IAppStorage } from '../src/IAppStorage';
import { AppStorageMock } from './AppStorageMock';

describe('Fibonacci 2', () => {
    let appStorageMock: IAppStorage;
    let note: Note;
    

    beforeAll(() => {
        appStorageMock = new AppStorageMock();
        note = new Note(appStorageMock)
    })

    it('calculate 0', () => {
        const ret = note.createNote(1, "title", "tekst", "blue", false);
        expect(ret).toBe({
            id: 1, 
            title: "title", 
            text: "tekst", 
            color: "blue", 
            pinned: false
        })
    })



})