const tempStorage = {
    "base": [
        {
            "question": "Что такое ООП?",
            "answer": "методология программирования, основанная на представлении программы в виде совокупности объектов, каждый из которых является экземпляром определённого класса, а классы образуют иерархию наследования."
        },
        {
            "question": "Как создать расширение для Chrome",
            "answer": "IT IS WORK"
        }
    ]
};

const styles = 'position: fixed; right: 20px; left: 20px; bottom: 10px; background-color: gray; z-index: 1; font-size: 11px;';

function init() {
    var data = chrome.runtime.getURL("databases/data.json");
    console.log(data);
    alert("Cheat Sheet database loaded");
}

function isKnownQuestion(element, selection) {
    if(element.question.indexOf(selection) !== -1)
        return true;
    return false;
}

function printAnswer(result, timeout = 3000) {
    if(result){
        pageContainer.innerText = result.answer;
        pageContainer.style.display = 'block';
        setTimeout(() => pageContainer.style.display = 'none', timeout);
    }
    else {
        pageContainer.style.display = 'none';
    }
}

function selectionEnd() {
    const selection = window.getSelection();
    if(selection && selection.type === 'Range') {
        let result = tempStorage.base.find(item => isKnownQuestion(item, selection));
        printAnswer(result);
    }
}

let pageContainer = document.createElement('div');
pageContainer.style.cssText = styles;
document.body.append(pageContainer);
document.onmouseup = selectionEnd;
init();