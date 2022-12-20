const createAnswerContainer = () => {
    const container = document.createElement('div');
    container.setAttribute("style", "position: fixed; right: 20px; left: 20px; bottom: 10px; background-color: #eaf3ff; z-index: 1; font-size: 11px;");
    document.body.append(container);

    return container;
}

const selectionEnd = () => {
    const selection = window.getSelection();
    if(selection && selection.type === 'Range') {
        chrome.storage.local.get(['cheatSheetExtensionDatabase'], (result) => {
            const database = result.cheatSheetExtensionDatabase;

            var answer;

            Object.keys(database).forEach(key => {
                const currentDatabase = database[key];
                const currentDatabaseResult = currentDatabase.find(item => isKnownQuestion(item, selection));

                if(currentDatabaseResult) {
                    answer = currentDatabaseResult;
                }
            });

            printAnswer(answer);

        });
    }
}

const isKnownQuestion = (element, selection) => {
    const question = element.question.toLowerCase();
    const selectedText = selection.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return !!(question.indexOf(selectedText) !== -1);
}

const printAnswer = (result, timeout = 3000) => {
    if(result){
        pageContainer.innerText = result.answer;
        pageContainer.style.display = 'block';
        setTimeout(() => pageContainer.style.display = 'none', timeout);
    }
    else {
        pageContainer.style.display = 'none';
    }
}

const pageContainer = createAnswerContainer();

document.onmouseup = selectionEnd;
