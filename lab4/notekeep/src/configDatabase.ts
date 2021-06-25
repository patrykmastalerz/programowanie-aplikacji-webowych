import { AppFirestoreStorage } from "./AppFirestoreStorage";
import { AppStorage } from "./AppStorage";
import { IAppStorage } from "./IAppStorage";

export let SHOULD_BE_FIRESTORE:boolean = true;

export class DatabaseConfiguration {

    public static selectTypeOfDatabase(): IAppStorage {
        
        if(SHOULD_BE_FIRESTORE)
            return new AppFirestoreStorage();
        else    
            return new AppStorage();
    }

}