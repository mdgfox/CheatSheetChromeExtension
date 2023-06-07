import { Database, RegisteredQuestion } from "./types";

export const isKnownQuestion = (element: RegisteredQuestion, selection: Selection) => {
    const question = element.question.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const selectedText = selection.toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    return !!(question.indexOf(selectedText) !== -1);
};

export const findSelectionInDatabase = (database: Database, selection: Selection) => {
    const questions = Object.keys(database)
        .map(key => database[key].find(item => isKnownQuestion(item, selection)))
        .filter(item => item);
    return questions.length ? questions[0] : undefined;
};
