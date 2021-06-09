import { INoteInterface } from "./INoteInterface";

export interface IAppStorage{
    saveData(note: INoteInterface): Promise<void>;
    updateData(id: number, title: string, text: string, pinned: boolean): void;
    getData(): Promise<INoteInterface[]>;
    removeData(id: number): void;
}