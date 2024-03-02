import { LOCAL_STORE_DATABASE_KEY } from "./types";

chrome.runtime.onInstalled.addListener(async () => {
    try {
        const url = chrome.runtime.getURL("databases/LinkedIn.json");

        const response = await fetch(url);

        if (response.status !== 200) {
            console.error("Oops, something went wrong! Status Code: " + response.status);
            return;
        }

        const data = await response.json();

        await chrome.storage.local.set({ [LOCAL_STORE_DATABASE_KEY]: data });

        console.log("Core database load successfully!");
    } catch(error) {
        console.error(error);
    }
});
