import { LOCAL_STORE_DATABASE_KEY } from "./types";
import LINKED_IN_TESTS from "./data/linked-in.json";
import LOGIC_TESTS from "./data/logic-test.json";

chrome.runtime.onInstalled.addListener(async () => {
    try {
        const data = { ...LINKED_IN_TESTS, ...LOGIC_TESTS };

        await chrome.storage.local.set({ [LOCAL_STORE_DATABASE_KEY]: data });

        console.log("Core database load successfully!");
    } catch(error) {
        console.error(error);
    }
});
