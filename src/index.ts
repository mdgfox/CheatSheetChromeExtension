import { forOwn } from "lodash";
import { Database, RegisteredQuestion } from "./types";

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
            const database: Database = result.cheatSheetExtensionDatabase;

            let question: RegisteredQuestion | undefined = undefined;

            forOwn(database, (collection) => {
                const findingQuestion = collection.find(item => isKnownQuestion(item, selection));
                question = findingQuestion;
            });

            printAnswer(question);

        });
    }
}

const isKnownQuestion = (element: RegisteredQuestion, selection: Selection) => {
    const question = element.question.toLowerCase();
    const selectedText = selection.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return !!(question.indexOf(selectedText) !== -1);
}

const printAnswer = (question: RegisteredQuestion | undefined, timeout = 3000) => {
    if(question){
        pageContainer.innerText = question.answer;
        pageContainer.style.display = 'block';
        setTimeout(() => pageContainer.style.display = 'none', timeout);
    }
    else {
        pageContainer.style.display = 'none';
    }
}

const pageContainer = createAnswerContainer();

document.onmouseup = selectionEnd;
