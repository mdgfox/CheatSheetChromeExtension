chrome.runtime.onInstalled.addListener(() => {
    let url = chrome.runtime.getURL("databases/default.json");

    fetch(url).then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(cheatSheetExtensionDatabase) {
                chrome.storage.local.set({ cheatSheetExtensionDatabase }, function() {
                    console.log('Default database load successfully.');
                });
                console.log(`Default database: ${JSON.stringify(cheatSheetExtensionDatabase)}`);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
});
