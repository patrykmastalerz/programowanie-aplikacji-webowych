import { INoteInterface } from "./INoteInterface";

export class NoteUi{
    
    public static createElement<T extends HTMLDivElement | HTMLSpanElement |  HTMLButtonElement>(type: string, id: string, className: string, content?: string, color?: string): T {
        if(type === "div"){
            const noteWrapper: HTMLDivElement = document.createElement(`div`);
            noteWrapper.style.backgroundColor = color;
            noteWrapper.className = className;
            noteWrapper.id = id;
            return noteWrapper as T;

        } else if (type === "span") {
            const titleSpan: HTMLSpanElement = document.createElement("span");
            titleSpan.textContent = content;
            titleSpan.className = className;
            titleSpan.id = id;

            return titleSpan as T;
        } else if (type === "button") {
            const deleteBtn: HTMLButtonElement = document.createElement("button");
            deleteBtn.className = className;
            deleteBtn.textContent = content;
            deleteBtn.id = id;
            
            return deleteBtn as T;
        }
    }
}