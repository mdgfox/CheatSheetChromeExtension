export interface RegisteredQuestion {
    question: string;
    answer: string;
}

export interface Database {
    [key: string]: Array<RegisteredQuestion>;
}

export const LOCAL_STORE_DATABASE_KEY = 'CHEAT_DATABASE';

export const LOCAL_STORE_TURN_ON_KEY = 'CHEAT_TURN_ON';
