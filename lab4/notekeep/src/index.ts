
import './main.scss';
import { Note } from './note';
import { Notes } from './notes';
import { DatabaseConfiguration } from './configDatabase';


const appDatabase = DatabaseConfiguration.selectTypeOfDatabase();

const note = new Note(appDatabase);
const notes = new Notes(appDatabase, note);
