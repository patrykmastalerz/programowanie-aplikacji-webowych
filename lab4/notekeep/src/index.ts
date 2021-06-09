
import './main.scss';
import { AppStorage } from './appStorage';
import { Note } from './note';
import { Notes } from './notes';
import { AppFirestoreStorage } from './AppFirestoreStorage';

const appStorage = new AppStorage();
const fire = new AppFirestoreStorage();

const note = new Note(fire);
const notes = new Notes(fire, note);
