const fileInput = document.getElementById('file_input');
const clearButton = document.getElementById('clear_button');

const logFile = (event) => {
	let str = event.target.result;
	let json = JSON.parse(str);
    mergeNewDatabase(json);
}

const mergeNewDatabase = (newJson) => {
    chrome.storage.local.get(['cheatSheetExtensionDatabase'], (result) => {
        const oldDatabase = result.cheatSheetExtensionDatabase;

        const cheatSheetExtensionDatabase = {...oldDatabase, ...newJson};

        chrome.storage.local.set({ cheatSheetExtensionDatabase }, () => {
            console.log('Database updated successfully.');
            console.log('json', cheatSheetExtensionDatabase);
        });
    });
}

fileInput.onchange = function() {
  const selectedFiles = [...fileInput.files];
  console.log(selectedFiles);

  const jsons = selectedFiles.map((file) => {
      if (!file) return;

      let reader = new FileReader();

      reader.onload = logFile;

      reader.readAsText(file);
  });
}

clearButton.onclick = async function() {
    await chrome.storage.local.clear();

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
}
