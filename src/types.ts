export interface RegisteredQuestion {
    question: string;
    answer: string;
}

export interface Database {
    [key: string]: Array<RegisteredQuestion>;
}
