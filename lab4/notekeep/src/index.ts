
import './main.scss';
import { AppStorage } from './appStorage';
import { Note } from './note';
import { Notes } from './notes';

const appStorage = new AppStorage();
const note = new Note(appStorage);
const notes = new Notes(appStorage, note);

