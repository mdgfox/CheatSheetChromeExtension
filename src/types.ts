export interface RegisteredQuestion {
    question: string;
    answer: string;
}

export interface Database {
    [key: string]: Array<RegisteredQuestion>;
}

export const LOCAL_STORE_DATABASE_KEY = 'CHEAT_DATABASE';
