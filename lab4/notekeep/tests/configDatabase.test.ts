import { AppFirestoreStorage } from "../src/AppFirestoreStorage";
import { AppStorage } from "../src/AppStorage";
import { DatabaseConfiguration, SHOULD_BE_FIRESTORE } from "../src/configDatabase";

describe('configDatabase', () => {

    it('should be AppFirestoreStorage or AppStorage', () => {
        const appDatabase = DatabaseConfiguration.selectTypeOfDatabase();

        if(SHOULD_BE_FIRESTORE)
            expect(appDatabase instanceof AppFirestoreStorage).toBe(true);
        else
            expect(appDatabase instanceof AppStorage).toBe(true);
    })
})