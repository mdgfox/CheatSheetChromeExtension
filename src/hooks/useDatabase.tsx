import { useCallback, useEffect, useState } from "react";
import { Database, LOCAL_STORE_DATABASE_KEY } from "../types";

export const useDatabase = () => {
    const [database, setDatabase] = useState<Database>({});

    const setDatabaseWrapper = useCallback(async (newDatabase: Database) => {

        await chrome.storage.local.set({ [LOCAL_STORE_DATABASE_KEY]: newDatabase });

        setDatabase(newDatabase);
    }, [setDatabase]);

    useEffect(() =>{
        const getDataFromStorage = async () => {
            const result = await chrome.storage.local.get([LOCAL_STORE_DATABASE_KEY]);
            setDatabase(result[LOCAL_STORE_DATABASE_KEY]);
          };
          getDataFromStorage().catch(console.error);
    }, [setDatabase]);

    return {database, setDatabase: setDatabaseWrapper};
};
